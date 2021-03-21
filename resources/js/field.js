Nova.booting((Vue, router, store) => {
    Vue.component('form-nova-ajax-select', require('./components/FormField'))
    Vue.component('detail-additional-fields', require('./components/DetailField'))
})
