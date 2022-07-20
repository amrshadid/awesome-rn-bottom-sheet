import { Dimensions, StyleSheet, ViewStyle } from 'react-native';
import React, { useCallback, useEffect, useImperativeHandle, useState } from 'react';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Arrow from './Arrow'

const { height: SCREEN_HEIGHT } = Dimensions.get('window');


type SheetProps = {
  children?: React.ReactNode;
  initState:number
  maxState:number
  contentContainerStyle?:ViewStyle,
  ArrowStyle?:ViewStyle,
  ShowArrow?:boolean
};

export type SheetRefProps = {
  scrollTo: (destination: number,active: boolean) => void;
  isActive: () => boolean;
};

const Sheet = React.forwardRef<SheetRefProps, SheetProps>(
  ({ initState, maxState, children, contentContainerStyle, ArrowStyle, ShowArrow }, ref) => {
    
    let MAX_TRANSLATE_Y =  -hp(`${maxState}%`)
    let MIN_TRANSLATE_Y =  -hp(`${initState}%`)

    const translateY = useSharedValue(0);
    const [active,set_active]=useState(false)

    useEffect(()=>{
      if(initState){
        scrollTo(initState,false)
      }
    },[])

    const scrollTo = useCallback((destination: number,active: boolean) => {
      let y = -hp(`${destination}%`)
      translateY.value = withSpring(y, { damping: 50 });
      runOnJS(set_active)(active);

    }, []);

    const isActive =() => {
      return active;
    };

    useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
      scrollTo,
      isActive,
    ]);

    const context = useSharedValue({ y: 0 });
    const gesture = Gesture.Pan()
      .onStart(() => {
        context.value = { y: translateY.value };
      })
      .onUpdate((event) => {
        if(event.translationY + context.value.y > MAX_TRANSLATE_Y)
          translateY.value = event.translationY + context.value.y;
        
        
      })
      .onEnd((_) => {
        if (translateY.value > context.value.y) {
          runOnJS(scrollTo)(initState,false);
        } else if (translateY.value < context.value.y) {
          runOnJS(scrollTo)(maxState,true);
        }
      });

    const rBottomSheetStyle = useAnimatedStyle(() => {
      const borderRadius = interpolate(
        translateY.value,
        [MAX_TRANSLATE_Y + 50, MAX_TRANSLATE_Y],
        [25, 5],
        Extrapolate.CLAMP
      );

      return {
        borderRadius,
        transform: [{ translateY: translateY.value }],
      };
    });


    return ( 
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle,contentContainerStyle,{height:hp(`${maxState}%`)}]}>
          {ShowArrow !== false?<Arrow Y_value={translateY} MAX_TRANSLATE_Y={MAX_TRANSLATE_Y} MIN_TRANSLATE_Y={MIN_TRANSLATE_Y} style={ArrowStyle}/>:null}
            {children}        
        </Animated.View>
      </GestureDetector>
    );
  }
);

const styles = StyleSheet.create({
  bottomSheetContainer: {
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 25,
  },
});

export default Sheet;