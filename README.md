# Awesome-rn-bottom-sheet

<div align='center'>
	<img src="https://user-images.githubusercontent.com/32217515/180024549-ee3a0e7a-1fc7-41c9-a0c8-00ec6840e04d.gif" width="200" />
	<img src="https://user-images.githubusercontent.com/32217515/180023955-4ac36d12-3708-41a6-a9ff-7da9185893ce.gif" width="200" />

	
[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)[![Build Status](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://travis-ci.org/joemccann/dillinger)
</div>



## Installation

Install my-project with npm

```bash
  npm install @amrshadid/awesome-rn-bottom-sheet
```
or with yarn 
```bash
 yarn add @amrshadid/awesome-rn-bottom-sheet
```
## Usage/Examples

```javascript
import { StatusBar } from  'expo-status-bar';
import  React  from  'react';
import { StyleSheet, View, Text } from  'react-native';
import  Sheet  from  'awesome-rn-bottom-sheet'

 
export  default  function  Example(){

return (
<View  style={styles.container}>
	<StatusBar  style="light"  />
	<Sheet
	initState={25}
	maxState={50}
	ShowArrow >
		<Text style={{alignSelf:"center",fontSize:25}}>
			Hello World!
		</Text>
	</Sheet>
</View>
);
}
const  styles = StyleSheet.create({
	container: {
		flex:  1,
		backgroundColor:  '#111',
		alignItems:  'center',
		justifyContent:  'center',
	}
});
```
```javascript
import { StatusBar } from  'expo-status-bar';
import  React, {useRef} from  'react';
import { StyleSheet, TouchableOpacity,View, Image} from  'react-native';
import  Sheet,{SheetRefProps} from  '../components/sheet'

export  default  function  SnapCode(){

const  ref = useRef<SheetRefProps>(null);

const  onPress =() => {
	const  isActive = ref?.current?.isActive();
	if (isActive) {
		ref?.current?.scrollTo(0,false);
	} else {
		ref?.current?.scrollTo(40,true);
	}
};

return (

<View  style={styles.container}>

	<StatusBar  style="light"  />
	
	<TouchableOpacity  
	style={styles.button}  
	onPress={onPress}/>

	<Sheet
	ref={ref}
	initState={0}
	maxState={40}
	ShowArrow
	ArrowStyle={{
	backgroundColor:'black',
	width:20
	}}
	>
		<View  style={styles.snapCodeContainer}>
			<Image
			style={styles.image}
			source={require('../assets/code.png')}
			/>
		</View>
	</Sheet>
</View>

);
}

const  styles = StyleSheet.create({
	container: {
		flex:  1,
		backgroundColor:  '#111',
		alignItems:  'center',
		justifyContent:  'center',
	},
	button: {
		height:  50,
		borderRadius:  25,
		aspectRatio:  1,
		backgroundColor:  'white',
		opacity:  0.6,
	},
	snapCodeContainer:{
		alignSelf:"center",
		width:'50%',
		height:'100%',
		borderRadius:20,
		marginTop:10,
		shadowColor:  "#000",
		shadowOffset: {
		width:  0,
		height:  3,
		},
		shadowOpacity:  0.27,
		shadowRadius:  4.65,
		elevation:  6,
		overflow:'hidden',
	},
	image: {
		alignSelf:"center",
		width:  180,
		height:  180,
		padding:5,
		borderRadius:30,
		borderBottomLeftRadius:35,
		borderBottomRightRadius:35
	},
});
```
## Props

|Props| Type| mandatory|Description|default|
|-|-|-|-|-|
| initState | number| true |The value of initial height of sheet, the value must be between 0-100| none|			
| maxState | number| true | The value of max height of sheet, the value must be between 0-100|none|
| contentContainerStyle | ViewStyle| false|StyleSheet| bottomSheetContainer|
| ArrowStyle | ViewStyle| false | StyleSheet|ArrowStyle
| ShowArrow | boolean| false | true: to show arrow or false to disable arrow |true


## Methods
To used this methods you should use useRef hook and pass it to Sheet component 
```javascript
...
	const  ref = useRef<SheetRefProps>(null);
	<Sheet
	ref={ref}
	...
	>
    
	</sheet>
...
```
**For more details take a look to second example**

|Methods|Description|
|-|-|
| scrollTo | ScrollTo is void function used to scroll a sheet to a specific position. The first parameter is the destination a value of which must be between 0-100, and the second parameter the active is boolean. Example: **ScrollTo(50,true)** |			
| isActive | isActive function used to return a boolean value of sheet active or not Example: **ref?.current?.isActive()**|



## 🔗 Author

Made by [Amr shadid](https://github.com/amrshadid)

[![portfolio](https://img.shields.io/badge/my_portfolio-000?style=for-the-badge&logo=ko-fi&logoColor=white)](https://amrshadid.github.io) [![linkedin](https://img.shields.io/badge/github-000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/amrshadid) 
