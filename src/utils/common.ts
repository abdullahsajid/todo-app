import queryString from "query-string";

import Papa from "papaparse";

namespace CommmonUtils {
  export const truncateDecimals = (
    num: number,
    decimalPlaces: number
  ): number => {
    const multiplier = Math.pow(10, decimalPlaces);
    return Math.trunc(num * multiplier) / multiplier;
  };

  export const decFixed = (val: number, dec: number): string => {
    if (val && dec) {
      const regex = new RegExp(`^(\\d*\\.\\d{0,${dec}})\\d*`);
      let res = val.toString().replace(regex, "$1");
      return res;
    } else {
      return val.toString();
    }
  };

  export const currencyFormat = (value: number, currency?: string): string => {
    if (Number.isNaN(value || 0)) {
      return value.toString();
    }
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
    }).format(value || 0);
  };

  export const isNotEmpty = (item: any): boolean => {
    return (
      item !== undefined && item !== null && item !== "" && item.length !== 0
    );
  };

  export const truncateString = (
    text: string,
    ellipsisString: number
  ): string => {
    return (text || "").length > ellipsisString
      ? `${text.substring(0, ellipsisString)}...`
      : text;
  };

  export const numberWithCommas = (x: number): string => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  export const handleMulDecimals = (
    value: number,
    tokenDecimals: number,
    decimals: number
  ): string => {
    return (value * 10 ** tokenDecimals).toFixed(decimals).toString();
  };

  export const handleDivDecimals = (
    value: number,
    tokenDecimals: number,
    decimals: number
  ): string => {
    return (value / 10 ** tokenDecimals).toFixed(decimals).toString();
  };

  export const dottedString = (x: string): string => {
    return `${x?.slice(0, 6)}...${x?.slice(36, 42)}`;
  };

  export const objectToParams = (obj: object): string => {
    const str = queryString.stringify(obj);
    return str;
  };

  export const toTitleCase = (phrase: string): string => {
    return phrase
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  export const timeoutPromise = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  export const roundNumber = (num: number, decimals: number = 6): number => {
    const t = 10 ** decimals;
    let result = Math.round((num + Number.EPSILON) * t) / t;
    if (num < 0) {
      result *= -1;
    }
    return result;
  };

  export const decimalConverter = (
    number: number,
    exponent: number
  ): string => {
    const decimals = (number * 10 ** exponent).toFixed(0).toString();
    return decimals;
  };

  export const addressConvertor = (address: string): string => {
    if ((address || "").length < 10) {
      return address || "";
    }
    return `${address.slice(0, 4)}...${address.slice(address.length - 6)}`;
  };
  export const nftIdConvertor = (nftId: string): string => {
    const id = nftId.toString();
    if ((id || "").length < 5) {
      return id || "";
    }
    return `${id.slice(0, 3)}...${id.slice(id.length - 4)}`;
  };

  export const isValidURL = (str: string): boolean => {
    const regex =
      /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    return regex.test(str);
  };

  export const copyToClipboard = (text: string, toastMessage: string): void => {
    navigator.clipboard.writeText(text);
  };

  export const csvToJson = async (event: any, setJson: any): Promise<void> => {
    if (event.target.files && event.target.files.length > 0) {
      const files = event.target.files;
      if (files) {
        await Papa.parse(files[0], {
          complete: (results: any) => {
            setJson(results.data);
          },
          header: true,
          skipEmptyLines: true,
        });
      }
    }
  };

  //   export const ipfsClient = async (file: any): Promise<string> => {
  //     try {
  //       const address = "https://ipfs.infura.io:5001/api/v0";
  //       const client = create(address);
  //       const result = await client.add(file);
  //       const url = `${app.IPFS_PATH}/${result.path}`;
  //       return url;
  //     } catch (error) {
  //       console.log(error, "ipfsError");
  //     }
  //   };

  export const networkShould = (chainId: string): boolean => {
    switch (chainId) {
      case "137":
      case "0x89":
        return true;
        break;
      case "0x4":
      case "4":
        return true;
        break;
      case "0x1":
      case "1":
        return true;
        break;
      default:
        return false;
    }
  };

  export const symbolConvertor = (symbol: string): string => {
    switch (symbol) {
      case "Cake-LP":
        return "CTZN/BUSD Cake-LP";
      case "UNI-V2":
        return "CTZN/USDC UNI-LP";

      default:
        return symbol;
    }
  };

  export const numFormatter = (num: number): string => {
    if (!num) return num.toString();
    if (num > 999 && num < 1000000) {
      return `${(num / 1000).toFixed(1)}K`; // convert to K for number from > 1000 < 1 million
    }
    if (num > 1000000) {
      return `${(num / 1000).toFixed(1)}K`; // convert to M for number from > 1 million
    }
    if (num > 1 && num < 900) {
      console.log("num", num);
      return num.toFixed(0); // if value < 1000, nothing to do
    }
    if (num < 0) {
      return num.toFixed(4);
    }
    return num.toString();
  };

  export const contract = (web3: any, abi: any, address: string): any => {
    return new web3.eth.Contract(abi, address);
  };

  export const mm_dd_yy = (date: string): string => {
    const d = new Date(date);
    let month = (d.getMonth() + 1).toString();
    let day = d.getDate().toString();
    const year = d.getFullYear();
    if (month.length === 1) month = `0${month}`;
    if (day.length === 1) day = `0${day}`;
    return `${month}-${day}-${year}`;
  };

  export const mm_yy = (date: string): string => {
    const d = new Date(date);
    let month = d.getMonth().toString();
    const year = d.getFullYear();

    switch (month) {
      case "0":
        month = "January";
        break;
      case "1":
        month = "Feburary";
        break;
      case "2":
        month = "March";
        break;
      case "3":
        month = "April";
        break;
      case "4":
        month = "May";
        break;
      case "5":
        month = "June";
        break;
      case "6":
        month = "July";
        break;
      case "7":
        month = "August";
        break;
      case "8":
        month = "September";
        break;
      case "9":
        month = "October";
        break;
      case "10":
        month = "November";
        break;
      case "11":
        month = "December";
        break;
    }
    return `${month} ${year}`;
  };

  export const validatePattern = (pattern: string, value: string): boolean => {
    const regex = new RegExp(pattern);
    return regex.test(value);
  };

  export const dynamicSort = (property: string) => {
    let sortOrder = 1;
    if (property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
    }
    return (a: any, b: any) => {
      let result =
        a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
      return result * sortOrder;
    };
  };

  export const removeTrailingZeroes = (num: number): number => {
    if (isNaN(num) || Math.abs(num) < Number.EPSILON) {
      return num;
    }

    const str = num.toString();

    const match = str.match(/^\d+(?:\.\d+)?(?=0*$|\d)/);

    if (!match || match[0].split(".")[1].length < 1) {
      return num;
    }

    return parseFloat(match[0]);
  };

  export const round = (x: number): string => {
    if (x) {
      return x.toFixed(5).replace(/\.?0*$/g, "");
    } else {
      return "00.00";
    }
  };

  export const checkIntegerSign = (value: number): boolean => {
    let x = Math.sign(value);
    if (x == 1) {
      return true;
    } else if (x == -1) {
      return false;
    } else {
      return false;
    }
  };

  export const getVersionParam = (): string | null => {
    let url = new URL(window.location.href);
    let version = url.searchParams.get("v");
    return version;
  };

  export const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  export const openExternalLink = (link: string) => {
    window.open(link, "_blank");
  };
}

export default CommmonUtils;
