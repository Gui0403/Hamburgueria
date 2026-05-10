<?php

namespace App\Http\Controllers;

use App\Models\Burger;

use Illuminate\Http\Request;

class BurgerController extends Controller
{
    public function index()
    {
        return Burger::latest()->get();
    }

    public function store(Request $request)
    {
        $validated =
            $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'price' => 'required|numeric|min:1',

                'image' =>
                    'required|image|mimes:jpg,jpeg,png,webp|max:2048',
            ]);

        $imagePath =
            $request
                ->file('image')
                ->store('burgers', 'public');

        $burger = Burger::create([
            'name' => $validated['name'],
            'description' => $validated['description'],
            'price' => $validated['price'],
            'image' => $imagePath,
        ]);

        return response()->json($burger, 201);
    }

    public function show(Burger $burger)
    {
        return $burger;
    }

    public function update(Request $request, Burger $burger)
    {
        $validated = $request->validate([
            'name' => 'required',
            'description' => 'required',
            'price' => 'required|numeric',

            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg,webp|max:2048',
        ]);

        // se veio nova imagem
        if ($request->hasFile('image')) {

            $imagePath = $request
                ->file('image')
                ->store('burgers', 'public');

            // substitui no array validado
            $validated['image'] = $imagePath;
        }

        // atualiza tudo de forma segura
        $burger->update($validated);

        return response()->json($burger);
    }

    public function destroy(Burger $burger)
    {
        $burger->delete();

        return response()->json([
            'message' => 'Burger removido'
        ]);
    }
}