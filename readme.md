# Nova Ajax Select

[![Latest Version on Github](https://img.shields.io/github/release/dillingham/nova-ajax-select.svg?style=flat-square)](https://packagist.org/packages/dillingham/nova-ajax-select)
[![Total Downloads](https://img.shields.io/packagist/dt/dillingham/nova-ajax-select.svg?style=flat-square)](https://packagist.org/packages/dillingham/nova-ajax-select)

Nova package to fill a select via ajax & based on other field values

### Install
```
composer require dillingham/nova-ajax-select
```

### Usage

Specify a url for the field to retrieve data from

Optionally, specifiy a parent() `attribute` to trigger the query:

```php
use NovaAjaxSelect\AjaxSelect;
```
```php
BelongsTo::make('Company'),

AjaxSelect::make('User')
    ->get('/api/company/{company}/users')
    ->parent('company'),

BelongsTo::make('User')->exceptOnForms(),
```
Add the field for index & detail views and use AjaxSelect for forms

### Example Endpoint

```php
Route::get('api/company/{company}/users', function($company_id) {

    $company = \App\Company::findOrFail($company_id);

    return $company->users->map(function($user) {
        return ['key' => $user->id, 'display' => $user->name ];
    });
});
```

### Url Options

| parameter | description | value |
| - | - | - |
| {resource-name} | the resource name | "Order" |
| {resource-id} | the resource being edited | "11"
| {parent} | put the attribute ie {company} | "22" |