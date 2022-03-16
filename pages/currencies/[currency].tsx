import {useEffect, useState} from "react";
import {number} from "prop-types";
import {useRouter} from "next/router";
import Currency from "../../components/Currencies/Currency";
import {Flex, Image} from "@chakra-ui/react";
import BitcoinIcon from "../../icons/BitcoinIcon";


type Props = {

}

const CurrenciesMenu = ({}: Props) => {
    const [currencyData, setCurrencyData] = useState({});
    const router = useRouter();

    const getCurrencyValues = async (currency: string) => {
        const data = await fetch(`http://localhost:8080/v1/currencies/${currency}`, {method: "GET"}).then((response) => response.json());
        setCurrencyData(data);
    }

    useEffect(() => {
        getCurrencyValues("eth");
    }, [])

    const onChangeCurrencyView = (currencyId: number) => {
        switch (currencyId) {
            case 1:
                // call api to fetch data con service, one it resolves finished, push new url
                getCurrencyValues("btc").then(() => router.push("http://localhost:3000/currencies/btc"));
                break;
            case 2:
                // call api to fetch data con service, one it resolves finished, push new url
                getCurrencyValues("eth").then(() => router.push("http://localhost:3000/currencies/eth"));
                break;
            case 3:
                // call api to fetch data con service, one it resolves finished, push new url
                getCurrencyValues("ada").then(() => router.push("http://localhost:3000/currencies/ada"));
                break;
            case 4:
                // call api to fetch data con service, one it resolves finished, push new url
                getCurrencyValues("dolar").then(() => router.push("http://localhost:3000/currencies/dolar"));
                break;
        }
    }

    return (
        <>
            <Flex direction={"row"} justifyContent={"space-between"} width={"75%"}>
                <Image rounded={"full"}
                       src={"https://bitcoin.org/img/icons/opengraph.png?1644775669"}
                       width={12}
                       height={12}
                       cursor={"pointer"}
                       onClick={() => onChangeCurrencyView(1)}
               />
                <Image rounded={"full"}
                       src={"https://upload.wikimedia.org/wikipedia/commons/b/b7/ETHEREUM-YOUTUBE-PROFILE-PIC.png"}
                       width={16}
                       height={14}
                       cursor={"pointer"}
                       onClick={() => onChangeCurrencyView(2)}
                />
                <Image rounded={"full"}
                       src={"https://www.pngall.com/wp-content/uploads/10/Cardano-Crypto-Logo-PNG-Picture.png"}
                       width={12}
                       height={12}
                       cursor={"pointer"}
                       onClick={() => onChangeCurrencyView(3)}
                />
                <Image
                       src={"https://e7.pngegg.com/pngimages/768/544/png-clipart-1-u-s-dollar-banknote-united-states-one-dollar-bill-united-states-dollar-united-states-one-hundred-dollar-bill-banknote-dollar-united-states-cash.png"}
                       width={24}
                       height={12}
                       cursor={"pointer"}
                       onClick={() => onChangeCurrencyView(4)}
                />
            </Flex>
            <Flex>
                <Currency values={currencyData} />
            </Flex>
        </>
    )
}

export default CurrenciesMenu;

