<?php namespace Bt7s7k7\Blog\Http\Controller;

use Bt7s7k7\Blog\Models\Post;
use Illuminate\Routing\Controller;
use Input;

class PostsController extends Controller
{
    public function index()
    {
        return Post::all();
    }

    public function show($id)
    {
        return Post::findOrFail($id);
    }

    public function store()
    {
        $data = Input::all();

        $post = Post::create($data);

        return $post;
    }

    public function update($id)
    {
        $data = Input::all();

        $post = Post::findOrFail($id);

        $post->fill($data);

        $post->save();

        return $post;
    }

    public function destroy($id)
    {
        $post = Post::findOrFail($id);
        $post->delete();
        return $post;
    }

}
