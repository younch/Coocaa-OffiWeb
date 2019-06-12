function openWindow(){
	var q = "light";
	switch(obj.id)
	{
		case 'contact':
		q = "light";
		break;
		
	}
	document.getElementById(q).style.display='block';
	document.getElementById('fade').style.display='block';
}
function closeWindow(){
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
}