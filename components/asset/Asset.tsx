import { Box, Button, AssetList, BasicModal, TextField, Combobox, AssetWithdrawTokens } from "@interchain-ui/react";
import { observer, inject } from "mobx-react";
import React, { useState } from "react";
import { Chain, Asset  } from '@chain-registry/types';
import { getLogo } from "@/utils";

export const AssetView = inject("store")(observer((props) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isDepositOpen, setIsDepositOpen] = useState<boolean>(false);
    
    const buttonName = "Add Asset";
    const assetItems = props.store.getAssetItems();
    const chains = props.store.chains;
    const [selectedChain, setSelectedChain] = useState<string>("");
    const [selectedAsset, setSelectedAsset] = useState<Asset>();
    const [assetAmount, setAssetAmount] = useState<string>("");
    const [assetAmountPrice, setAssetAmountPrice] = useState<string>("");
    const chainAssets = props.store.findAssetsByChain(selectedChain);
    const assetList =assetItems.map((assetItem: any) => {
        const asset = props.store.findAssetByName(assetItem.name);
        return {
            imgSrc: getLogo(asset),
            isOtherChains: false,
            name: asset.name,
            onDeposit: function Va(){setIsDepositOpen(true)},
            onWithdraw: function Va(){},
            symbol: asset.symbol,
            tokenAmount: assetItem.tokenAmount,
            tokenAmountPrice: assetItem.tokenAmountPrice
        };
    });
    return (
        <Box py="$16">
            <Box
                my="$8"
                flex="1"
                width="full"
                display="flex"
                height="$16"
                overflow="hidden"
                justifyContent="right"
                px={{ mobile: "$8", tablet: "$10" }}
                >
                    <Button
                        onClick={() => setIsOpen(true)}
                        domAttributes={{
                            style: {
                            backgroundImage:
                                "linear-gradient(109.6deg, rgba(157,75,199,1) 11.2%, rgba(119,81,204,1) 83.1%)",
                            },
                      }}>
                        {buttonName}
                    </Button>
                    <BasicModal
                        isOpen={isOpen}
                        onClose={() => setIsOpen(false)}
                        renderTrigger={function Va(){}}
                        title="Add Asset"
                    >
                        <Combobox
                            label="Chain" 
                            openOnFocus
                            onSelectionChange={(item) => {
                                if (item) {
                                    setSelectedChain(item);
                                }
                            }}
                            styleProps={{
                                width: "100%"
                            }}>
                                {chains.map((chain: Chain) => <Combobox.Item key={chain.chain_name}>{chain.chain_name}</Combobox.Item>)}
                        </Combobox>
                        <Combobox label="Asset" 
                            onSelectionChange={(item) => {
                                if (item) {
                                    setSelectedAsset(props.store.findAssetByName(item));
                                }
                            }}
                            styleProps={{
                                width: "100%"
                            }}>
                                {chainAssets.map((asset: Asset) => <Combobox.Item key={asset.name}>{asset.name}</Combobox.Item>)}
                        </Combobox>
                        <TextField
                            id="amount"
                            label="Token amount"
                            onChange={(e: any) => setAssetAmount(e.target.value)}
                            placeholder="Please enter amount"
                        />
                        <TextField
                            id="price"
                            label="Token amount price"
                            onChange={(e: any) => setAssetAmountPrice(e.target.value)}
                            placeholder="Please enter amount price"
                        />
                        <Box py="$8" width="full" display="flex" justifyContent="space-evenly">
                            <Button  onClick={() => {
                                props.store.addAssetItem({name:selectedAsset?.name, tokenAmount: assetAmount, tokenAmountPrice:assetAmountPrice});
                                setIsOpen(false);
                            }}>
                                {"Add"}
                            </Button>
                            <Button  onClick={() => setIsOpen(false)}>
                                {"Cancel"}
                            </Button>
                        </Box>
                    </BasicModal>
            </Box>
            
            <AssetList
                list={assetList}
                titles={[
                    'Asset',
                    'Balance'
                ]} needChainSpace={false}            />
            <BasicModal
                isOpen={isDepositOpen}
                onClose={() => setIsDepositOpen(false)}
                renderTrigger={function Va(){}}
                title="Deposit ATOM"
            >
                <AssetWithdrawTokens
                    amount="2"
                    available={2}
                    fromAddress="atom1xy5y...m6wwz9a"
                    fromImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/cosmoshub/images/atom.png"
                    fromName="Cosmos Hub"
                    fromSymbol="ATOM"
                    onAddressChange={function Va(){}}
                    onAddressConfirm={function Va(){}}
                    onCancel={function Va(){ setIsDepositOpen(false) }}
                    onChange={function Va(){}}
                    onTransfer={function Va(){}}
                    priceDisplayAmount={1013.2}
                    timeEstimateLabel="20 seconds"
                    toAddress="osmo1xy5y..w9a"
                    toImgSrc="https://raw.githubusercontent.com/cosmos/chain-registry/master/osmosis/images/osmo.svg"
                    toName="Osmosis"
                />
            </BasicModal>
        </Box>
    );
}));
