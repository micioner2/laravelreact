<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Categoria extends Model
{
  protected $fillable = ['nom_categoria','estado'];
  public $timestamps = false;
}
