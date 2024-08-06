import { Platform } from "react-native"

interface Color {
    bottomBackground : string
    whiteHex:string
    blue:string
    grayHex:string
}
export const COLORS : Color ={
    bottomBackground:'#a7a7a7',
    whiteHex:'#FFFFFF',
    blue: '#6495ED',
    grayHex: '	#808080'

}

interface FontSize {
    size_8: number;
    size_10: number;
    size_12: number;
    size_14: number;
    size_16: number;
    size_18: number;
    size_20: number;
    size_22: number;
    size_24: number;
    size_28: number;
    size_30: number;
    size_35: number;
    size_40: number;
    size_44: number;
}

export const FONTSIZE: FontSize = {
    size_8: 8,
    size_10: 10,
    size_12: 12,
    size_14: 14,
    size_16: 16,
    size_18: 18,
    size_20: 20,
    size_22: 22,
    size_24: 24,
    size_28: 28,
    size_30: 30,
    size_35: 35,
    size_40: 40,
    size_44: 44,
};

export const tabBarHeight = Platform.OS === 'android' ? 80 : 110;