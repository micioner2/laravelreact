<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Producto extends Model
{
    protected $fillable = ['id_categoria','nom_producto'];
    public $timestamps = false;
}
