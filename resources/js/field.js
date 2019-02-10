Nova.booting((Vue, router, store) => {
    Vue.component('index-nova-ajax-select', require('./components/IndexField'))
    Vue.component('detail-nova-ajax-select', require('./components/DetailField'))
    Vue.component('form-nova-ajax-select', require('./components/FormField'))
})
