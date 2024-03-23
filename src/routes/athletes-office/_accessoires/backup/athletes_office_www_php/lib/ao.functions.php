<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

namespace ao;

/**
 * Description of ao
 *
 * @author harry
 */
class aoFunctions 
{
    
    /*
     * 
     */
    public static function printNavigationForHTMLKickstart ($nav, $styleUL, $level=0) 
    {
        try
        {
            global $cgi;

            printf('<ul style="%s">', $styleUL);
            
            foreach ($nav as $navElem) {
                
                $name = $navElem['name'];
                $icon = $navElem['icon'];
                $subm = $navElem['submenu'];
                
                $highlight = '';
                if ($cgi->Exist($name) && ($cgi->$name == $nav['page'] || $cgi->$name == $nav['name'])) {
                    $highlight = ' class="current"';
                }
                                
                printf('<li %s>%s</li>', $highlight, $navElem['name']);
                
                
            }
            
            
            
            
            printf('</ul>');
            
            /*
            
            <li';
                    for ($i=0; $i<=$level; $i++) 
                    {
                            $name = 'page'.$i;
                            $name = str_replace('page0', 'page', $name);
                            if ($cgi->Exist($name) && 
                                    ($cgi->$name == $nav['page'] || $cgi->$name == $nav['name'])) 
                                    { echo ' class="current"'; }
                    }
            echo '>';

            echo '<a href="?';
                    $x = array();
                    for ($i=0; $i<=$level; $i++) 
                    {
                            $name = 'page'.$i;
                            $name = str_replace('page0', 'page', $name);
                            if ($i==$level) {
                                    $link = $nav['page'];
                                    if ($link == "") $link = $nav['name']; 
                                    $x[]  = $name.'='.$link;
                            } else {
                                    $x[] = $name.'='.$cgi->$name; 
                            }
                    }
                    echo implode($x, '&');
            echo '">';
            if ($nav['icon'] != "") { echo '<i class="'.$nav['icon'].'"></i> '; }
            echo $nav['name'].'</a>';
            echo '</li>';

            if (is_array($nav['submenu'])) 
            {
                    writeNav($nav['submenu'], $level++);
            }
             * */
        } catch (Exception $ex) {

        }
    }
    
    
}
