

/*var myobject = {
	"User": {
		"name" : "pippo",
		"Address":{
			"Street":"Via Pluto"
		}
	},
	"Items": [
		{
			"Code" : "1"
		},
		{
			"Code" : "2"
		},
		{
			"Code" : "3"
		}		
	]
};

function getProperty(propertyName, object ) {
	var parts = propertyName.split( "." ), 
				length = parts.length,
				i,
				property = object || this;

	for ( i = 0; i < length; i++ ) {
		
		var part = parts[i];

		var openSquare = parts[i].indexOf('[');
		var closeSquare = parts[i].indexOf(']');
		if(openSquare !== -1 && closeSquare !== -1) {
			var index = parts[i].substring(openSquare + 1, closeSquare);
			var list = parts[i].substring(0, openSquare);
			property = property[list];
			property = property[index];
		}
		else {
			var openRound = parts[i].indexOf('(');
			var closeRound = parts[i].indexOf(')');
			if(openRound !== -1 && closeRound !== -1) {
				var fields = parts[i].substring(openRound + 1, closeRound).split('=');
				var list = parts[i].substring(0, openRound);
				property = property[list];
				for ( var obj in property) {
					var o = property[obj];
					if (o[fields[0]] == fields[1]){						
						property = o;
						break;
					}
				}
			}
			else
				property = property[part];
		}
	}
	return property;
};
*/

function split(propertyName) {

	var openRound = propertyName.indexOf('(');
	var closeRound = propertyName.indexOf(')');
	if(openRound === -1 && closeRound === -1) {
		return propertyName
					.replace('{','')
					.replace('}','')
					.split( "." );
	}
	var left = propertyName.substring(0, openRound).replace('{','');
	var right = propertyName.substring(closeRound+1).replace('}','');
	var inner = propertyName.substring(openRound +1, closeRound );

	var arrleft = left.split('.');
	var arrRight = right.split('.');
	var result = [];
	var i;
	for (i = 0; i < arrleft.length - 1; i++) {
		if ( arrleft[i] !== '')
			result.push(arrleft[i]);
	};
	result.push(arrleft[arrleft.length - 1] + '(' + inner + ')');
	for (i = 0; i < arrRight.length; i++) {
		if ( arrRight[i] !== '')
			result.push(arrRight[i]);
	};

};

//var prop1 = getProperty("User.name", myobject);
//var prop2 = getProperty("User.Address.Street", myobject);


//var prop3 = getProperty("Items(Code=1)", myobject);

var prop3 = split('{GetCart.Checkout.Cart.Order.Items(Cod10=41475128JE).Cod10}');
//var prop3 = split('{GetCart.Checkout.Cart.Order.Items[0].Cod10}');
//console.log(prop3);