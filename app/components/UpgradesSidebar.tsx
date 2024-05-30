// UpgradesSidebar.tsx
import React from 'react';
import { styles } from '../styles/styles';

type UpgradeKeys = 'upgrade1' | 'upgrade2' | 'upgrade3';

interface UpgradesSidebarProps {
  clicks: number;
  upgrades: { [key in UpgradeKeys]: number };
  upgradePrices: { [key in UpgradeKeys]: number };
  buyUpgrade: (upgrade: UpgradeKeys) => void;
}

const UpgradesSidebar: React.FC<UpgradesSidebarProps> = ({ clicks, upgrades, upgradePrices, buyUpgrade }) => {

    const upgradeDescriptions = {
        upgrade1: "Doubles the shakes per click.",
        upgrade2: "Doubles the shakes per click again.",
        upgrade3: "Doubles the shakes per click once more."
    };

    return (
        <div style={styles.upgradesSidebar}>
        {(['upgrade1', 'upgrade2', 'upgrade3'] as UpgradeKeys[]).map((upgrade, index) => (
            <div key={upgrade} style={styles.item}>
            <h3>Upgrade {index + 1}</h3>
            <p>{upgradeDescriptions[upgrade]}</p>
            <p>Price: {upgradePrices[upgrade]} Shakes</p>
            <p>Owned: {upgrades[upgrade] >= 1 ? 'Yes' : 'No'}</p>
            <div style={styles.buttonBuyContainer}>
                {upgrades[upgrade] === 0 && (
                <button
                    style={
                    clicks >= upgradePrices[upgrade]
                        ? styles.buttonBuyEnabled
                        : styles.buttonBuyDisabled
                    }
                    onClick={() => buyUpgrade(upgrade)}
                    disabled={clicks < upgradePrices[upgrade]}
                >
                    Buy
                </button>
                )}
            </div>
            </div>
        ))}
        </div>
    );
}
export default UpgradesSidebar;