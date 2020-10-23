<?php namespace Bt7s7k7\Blog\Controllers;

use BackendMenu;
use Backend\Classes\Controller;
use Bt7s7k7\Blog\Models\Page;
use Input;
use Redirect;
use Backend;

/**
 * Posts Back-end Controller
 */
class Posts extends Controller
{
    /**
     * @var array Behaviors that are implemented by this controller.
     */
    public $implement = [
        'Backend.Behaviors.FormController',
        'Backend.Behaviors.ListController',
    ];

    /**
     * @var string Configuration file for the `FormController` behavior.
     */
    public $formConfig = 'config_form.yaml';

    /**
     * @var string Configuration file for the `ListController` behavior.
     */
    public $listConfig = 'config_list.yaml';

    public function __construct()
    {
        parent::__construct();

        BackendMenu::setContext('Bt7s7k7.Blog', 'blog', 'posts');
    }

    public function getSelectedPageID()
    {
        $selected = null;

        if (Input::has('page')) {
            $urlId = Input::get('page');
            if ($urlId != "") {
                $page = Page::find($urlId);
                if ($page != null) {
                    $selected = $page->id;
                }
            }
        }

        if ($selected == null) {
            $page = $this->vars['formModel']->pages()->first();

            if ($page != null) {
                $selected = $page->id;
            }
        }

        return $selected;
    }

    public function getLastPagePosition()
    {
        $pages = $this->vars['formModel']->pages;
        $position = 0;

        if ($pages != null && count($pages) > 0) {
            $position = $pages[count($pages) - 1]->position;
        }

        return $position;
    }

    public function onCreatePage()
    {
        $postId = Input::get('postId');
        $pagePosition = Input::get('position');

        $page = new Page();

        $page->position = $pagePosition;
        $page->post_id = $postId;

        $page->label = 'New Page';
        $page->content = 'Write page content here!';

        $page->save();

        return Redirect::to(Backend::url('bt7s7k7/blog/posts') . '/update/' . $postId . '?page=' . $page->id);
    }
}
