<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Producto;

class ProductoController extends Controller
{
    public function index(Request $request)
    {
        $productos = Producto::join('categorias as c','c.id','productos.id_categoria')
        ->Select('productos.id','productos.nom_producto','productos.estado',
        'c.id as id_categoria','c.nom_categoria')->get();
        return json_encode($productos);
    }


    public function store(Request $request)
    {
        $producto = Producto::create($request->all());
    }

    public function edit(Request $request)
    {
        $producto = Producto::findOrFail($request->id);
        $producto->id_categoria = $request->id_categoria;
        $producto->nom_producto = $request->nom_producto;
        $producto->save();
    }

    public function update(Request $request)
    {
        $producto = Producto::findOrFail($request->id);
        $estado = $request->estado;
        if($estado){
            $producto->estado = 0;
        }else{
            $producto->estado = 1;
        }

        $producto->save();
    }

    public function search(Request $request)
    {
        $search  = $request->search;
        $productos = Producto::Where('nom_producto','like','%'.$search.'%')
        ->orderByDesc('nom_producto')->limit('5')->get();

        return json_encode($productos);
    }
}
