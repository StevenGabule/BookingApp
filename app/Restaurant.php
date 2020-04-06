<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $guarded = [];

    public function getPhotoUrlAttribute() : String
    {
        return !empty($this->avatar) ? "http://localhost:8000/images/uploads/{$this->avatar}": 'http://gravatar.com/avatar?d=identicon';
    }
}
