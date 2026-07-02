import { ViewStyle, TextStyle } from 'react-native';
export interface DebugOverlayProps {
    /** Diameter of the floating action button in pixels. Default: 56 */
    fabSize?: number;
    /** Initial screen position of the FAB. Default: top-left area with safe offset */
    initialPosition?: {
        x: number;
        y: number;
    };
    /** Custom styles merged onto the FAB container */
    fabStyle?: ViewStyle;
    /** Custom styles merged onto the FAB icon text */
    fabTextStyle?: TextStyle;
    /** Icon/emoji shown inside the FAB. Default: "⚡" */
    fabIcon?: string;
}
export declare const DebugOverlay: ({ fabSize, initialPosition, fabStyle, fabTextStyle, fabIcon, }?: DebugOverlayProps) => import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=DebugOverlay.d.ts.map