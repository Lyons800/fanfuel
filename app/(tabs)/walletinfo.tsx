import { DisplayAuthenticatedUserView } from "@/components/DisplayAuthenticatedUserView";
import { FC } from "react";
import { ScrollView } from "react-native";

const WalletInfoPage: FC = () => {
    return (
        <ScrollView>
            {/* Other components or content */}

            <DisplayAuthenticatedUserView />

            {/* Other components or content */}
        </ScrollView>
    );
};

export default WalletInfoPage;
