

var myobject = {
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

//var prop1 = getProperty("User.name", myobject);
//var prop2 = getProperty("User.Address.Street", myobject);


var prop3 = getProperty("Items(Code=1)", myobject);
console.log(prop3);


