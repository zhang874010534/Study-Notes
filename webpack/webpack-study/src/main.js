import $ from 'jquery'

import './css/index.css'
import './css/index.less'
import './css/index.scss'
$(()=>{
	$('li:odd').css('backgroundColor','lightgreen');
})

class Person{
	static info={ name:'shepi',age:20}
}