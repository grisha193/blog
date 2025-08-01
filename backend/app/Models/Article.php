<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Comment;
class Article extends Model
{
    protected $fillable = ['title', 'content'];
    use HasFactory;
    public function comments()
    {
        return $this->hasMany(Comment::class);
    }

}
