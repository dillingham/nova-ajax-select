<template>
    <default-field :field="field" :errors="errors">
        <template slot="field">
             <select v-model="value" class="w-full form-control form-select" :disabled="disabled">
                <option :value="null">Choose an option</option>
                <option
                    :key="option.value"
                    :value="option.value"
                    v-for="option in options">
                    {{ option.display }}
                </option>
            </select>
        </template>
    </default-field>
</template>

<script>
import { FormField, HandlesValidationErrors } from 'laravel-nova'

export default {
    mixins: [FormField, HandlesValidationErrors],

    props: ['resourceName', 'resourceId', 'field'],

    data() {
        return {
            options: [],
            loaded: false,
            parentValue: null
        }
    },

    mounted() {
        this.watchedComponents.forEach(component => {

            let attribute = 'value'

            if(component.field.component === 'belongs-to-field') {
                attribute = 'selectedResource';
            }

            component.$watch(attribute, (value) => {

                this.parentValue = (value && attribute == 'selectedResource') ? value.value : value;

                this.updateOptions();
            }, { immediate: true });
        });
    },

    computed: {
        watchedComponents() {
            return this.$parent.$children.filter(component => {
                return this.isWatchingComponent(component);
            })
        },
        endpoint() {
            return this.field.endpoint
                .replace('{resource-name}', this.resourceName)
                .replace('{resource-id}', this.resourceId ? this.resourceId : '')
                .replace('{'+ this.field.parent_attribute +'}', this.parentValue ? this.parentValue : '')
        },
        empty() {
            console.log( this.options.length)
            return this.loaded && this.options.length == 0;
        },

        disabled() {
            return this.loaded == false && (this.field.parent_attribute != undefined && this.parentValue == null) || this.options.length == 0;
        }
    },

    methods: {
        setInitialValue() {
            this.value = this.field.value || ''
        },

        fill(formData) {
            formData.append(this.field.attribute, this.value || '')
        },

        updateOptions() {
            this.options = [];
            this.value = null;
            this.loaded = false;

            if(this.notWatching() || (this.parentValue != null && this.parentValue != '')) {
                Nova.request().get(this.endpoint)
                    .then(response => {
                        this.loaded = true;
                        this.options = response.data;
                    })
            }
        },

        notWatching() {
            return this.field.parent_attribute == undefined;
        },

        isWatchingComponent(component) {
            return component.field !== undefined
                && component.field.attribute == this.field.parent_attribute;
        }
    },
}
</script>
