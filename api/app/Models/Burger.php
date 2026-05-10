<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Burger extends Model
{
    protected $fillable = [
        'name',
        'description',
        'price',
        'image',
    ];
}