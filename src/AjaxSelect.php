<?php

namespace NovaAjaxSelect;

use Laravel\Nova\Fields\Field;

class AjaxSelect extends Field
{
    public $component = 'nova-ajax-select';

    public function get($endpoint)
    {
        $this->withMeta(['endpoint' => $endpoint]);

        return $this;
    }

    public function parent($attribute)
    {
        $this->withMeta(['parent_attribute' => $attribute]);

        return $this;
    }
}
