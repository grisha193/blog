<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    public function index()
    {
        return Article::withCount('comments')->get();
    }

    public function show($id)
    {
        return Article::with('comments')->findOrFail($id);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required',
            'content' => 'required',
        ]);

        return Article::create($request->only('title', 'content'));
    }
}
