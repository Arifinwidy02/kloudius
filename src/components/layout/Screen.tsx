
import { SafeAreaView } from "react-native-safe-area-context";

export function Screen({ children, edges = ['top', 'bottom'] }: { children: React.ReactNode, edges?: ('top' | 'bottom' | 'left' | 'right')[] }) {
    return (
        <SafeAreaView edges={edges}>
            {children}
        </SafeAreaView>
    );
}