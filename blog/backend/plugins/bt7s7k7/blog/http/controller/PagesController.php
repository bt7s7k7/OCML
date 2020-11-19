<?php namespace Bt7s7k7\Blog\Http\Controller;

use Bt7s7k7\Blog\Models\Page;
use Illuminate\Routing\Controller;
use Input;

class PagesController extends Controller
{
    public function index()
    {
        return Page::all();
    }

    public function show($id)
    {
        $page = Page::findOrFail($id);
        $page->post;
        return $page;
    }

    public function store()
    {
        $data = Input::all();

        $page = Page::create($data);

        return $page;
    }

    public function update($id)
    {
        $data = Input::all();

        $page = Page::findOrFail($id);

        $page->fill($data);

        $page->save();

        return $page;
    }

    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();
        return $page;
    }

}
