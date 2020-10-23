<?php namespace Bt7s7k7\Blog\Controllers;

use BackendMenu;
use Backend\Classes\Controller;
use Input;
use Bt7s7k7\Blog\Models\Page;

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
        'Backend.Behaviors.ListController'
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

    public function getSelectedPage()
    {
        $selected = null;

        if (Input::has('page')) {
            $urlId = Input::get('page');
            if ($urlId != "") {
                $page = Page::find($urlId);
                if ($page != null) {
                    $selected = $page;
                }
            }
        }

        if ($selected == null) {
            $page = $this->vars['formModel']->pages()->first();

            if ($page != null) {
                $selected = $page;
            }
        }

        return $selected;
    }
}
