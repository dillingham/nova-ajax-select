# Nova Ajax Select

[![Latest Version on Github](https://img.shields.io/github/release/dillingham/nova-ajax-select.svg?style=flat-square)](https://packagist.org/packages/dillingham/nova-ajax-select)
[![Total Downloads](https://img.shields.io/packagist/dt/dillingham/nova-ajax-select.svg?style=flat-square)](https://packagist.org/packages/dillingham/nova-ajax-select)

Nova package to fill a select via ajax & based on other field values

### Install
```
composer require dillingham/nova-ajax-select
```

### Usage

```php

BelongsTo::make('Company'),

AjaxSelect::make('Employee')
    ->parent('company')
    ->get('/api/employees/{employee}')
    ->rules('required'),
```

### Url Options

| parameter | description | value |
| - | - | - |
| {resource-name} | the resource name | "Order" |
| {resource-id} | the resource being edited | "11"
| {parent} | put the attribute not ie {employee} | "22" |