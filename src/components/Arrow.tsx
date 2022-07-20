import React from 'react'
import {StyleSheet, View, ViewStyle } from 'react-native';
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from 'react-native-reanimated';

type ArrowProps = {
  style?: ViewStyle;
  Y_value:any;
  MAX_TRANSLATE_Y:number;
  MIN_TRANSLATE_Y:number;

}
const Arrow: React.FunctionComponent<ArrowProps>=(props:ArrowProps)=> {

  const rRightLineStyle = useAnimatedStyle(() => {
    const transformRight = interpolate(
      props.Y_value.value,
      [props.MIN_TRANSLATE_Y, props.MAX_TRANSLATE_Y],
      [-30,30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {rotateZ:`${transformRight}deg` },
        {translateX:2}
      ],
      borderTopLeftRadius:10,
      borderBottomLeftRadius:10
    };
  });

  const rLeftLineStyle = useAnimatedStyle(() => {
    const transformLeft = interpolate(
      props.Y_value.value,
      [props.MIN_TRANSLATE_Y, props.MAX_TRANSLATE_Y],
      [30,-30],
      Extrapolate.CLAMP
    );

    return {
      transform: [
        {rotateZ:`${transformLeft}deg` },
        {translateX:-2}
      ],
      borderTopRightRadius:10,
      borderBottomRightRadius:10

    };
  });

  return (
    <View style={{flexDirection:'row',alignSelf:"center"}}>
      <Animated.View style={[styles.Arrow,{
            backgroundColor: 'grey',
            ...props.style
      },rRightLineStyle]} />
      <Animated.View style={[styles.Arrow,{
          backgroundColor: 'grey',
          ...props.style
    },rLeftLineStyle]} />
    </View>
  )
}
export default Arrow

const styles = StyleSheet.create({
  Arrow: {
    width: 20,
    height: 4,
    alignSelf:'center',
    marginVertical: 15,
  },
});