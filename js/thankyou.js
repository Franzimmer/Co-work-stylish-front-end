app.init=function(){
	let number=app.getParameter("number");
	console.log(number);
	if(!number){
		window.location="./";
	}
	app.get("#number").textContent=number;
	app.cart.init();
};
window.addEventListener("DOMContentLoaded", app.init);