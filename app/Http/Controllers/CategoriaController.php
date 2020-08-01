<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Categoria;

class CategoriaController extends Controller
{
    public function index(Request $request){
        
        return json_encode(Categoria::all());
    }

    public function store(Request $request){
        $categoria = Categoria::create($request->all());
    }

    public function edit(Request $request){
        $categoria = Categoria::findOrFail($request->id);
        $categoria->nom_categoria = $request->nom_categoria;
        $categoria->save();
    }

    public function update(Request $request){
        $categoria = Categoria::findOrFail($request->id);
        $estado = $request->estado;
        if($estado){
            $categoria->estado = 0;
        }else{
            $categoria->estado = 1;
        }
        $categoria->save();

    
    }

}
