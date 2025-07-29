<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use App\Models\Comment;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $request->validate([
            'author_name' => 'required',
            'content' => 'required',
        ]);

        return $article->comments()->create($request->only('author_name', 'content'));
    }
}
