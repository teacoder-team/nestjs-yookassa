"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrencyEnum = exports.LocaleEnum = void 0;
/**
 * Перечисление поддерживаемых локалей.
 * Каждая локаль представляет собой комбинацию языка и страны.
 * @enum {string}
 */
var LocaleEnum;
(function (LocaleEnum) {
    /**
     * Русский язык, Россия.
     */
    LocaleEnum["ru_RU"] = "ru_RU";
    /**
     * Английский язык, США.
     */
    LocaleEnum["en_US"] = "en_US";
})(LocaleEnum || (exports.LocaleEnum = LocaleEnum = {}));
/**
 * Перечисление поддерживаемых валют.
 * Каждая валюта представлена в виде трехбуквенного кода.
 * @enum {string}
 */
var CurrencyEnum;
(function (CurrencyEnum) {
    CurrencyEnum["USD"] = "USD";
    CurrencyEnum["CAD"] = "CAD";
    CurrencyEnum["EUR"] = "EUR";
    CurrencyEnum["AED"] = "AED";
    CurrencyEnum["AFN"] = "AFN";
    CurrencyEnum["ALL"] = "ALL";
    CurrencyEnum["AMD"] = "AMD";
    CurrencyEnum["ARS"] = "ARS";
    CurrencyEnum["AUD"] = "AUD";
    CurrencyEnum["AZN"] = "AZN";
    CurrencyEnum["BAM"] = "BAM";
    CurrencyEnum["BDT"] = "BDT";
    CurrencyEnum["BGN"] = "BGN";
    CurrencyEnum["BHD"] = "BHD";
    CurrencyEnum["BIF"] = "BIF";
    CurrencyEnum["BND"] = "BND";
    CurrencyEnum["BOB"] = "BOB";
    CurrencyEnum["BRL"] = "BRL";
    CurrencyEnum["BWP"] = "BWP";
    CurrencyEnum["BYN"] = "BYN";
    CurrencyEnum["BZD"] = "BZD";
    CurrencyEnum["CDF"] = "CDF";
    CurrencyEnum["CHF"] = "CHF";
    CurrencyEnum["CLP"] = "CLP";
    CurrencyEnum["CNY"] = "CNY";
    CurrencyEnum["COP"] = "COP";
    CurrencyEnum["CRC"] = "CRC";
    CurrencyEnum["CVE"] = "CVE";
    CurrencyEnum["CZK"] = "CZK";
    CurrencyEnum["DJF"] = "DJF";
    CurrencyEnum["DKK"] = "DKK";
    CurrencyEnum["DOP"] = "DOP";
    CurrencyEnum["DZD"] = "DZD";
    CurrencyEnum["EEK"] = "EEK";
    CurrencyEnum["EGP"] = "EGP";
    CurrencyEnum["ERN"] = "ERN";
    CurrencyEnum["ETB"] = "ETB";
    CurrencyEnum["GBP"] = "GBP";
    CurrencyEnum["GEL"] = "GEL";
    CurrencyEnum["GHS"] = "GHS";
    CurrencyEnum["GNF"] = "GNF";
    CurrencyEnum["GTQ"] = "GTQ";
    CurrencyEnum["HKD"] = "HKD";
    CurrencyEnum["HNL"] = "HNL";
    CurrencyEnum["HRK"] = "HRK";
    CurrencyEnum["HUF"] = "HUF";
    CurrencyEnum["IDR"] = "IDR";
    CurrencyEnum["ILS"] = "ILS";
    CurrencyEnum["INR"] = "INR";
    CurrencyEnum["IQD"] = "IQD";
    CurrencyEnum["IRR"] = "IRR";
    CurrencyEnum["ISK"] = "ISK";
    CurrencyEnum["JMD"] = "JMD";
    CurrencyEnum["JOD"] = "JOD";
    CurrencyEnum["JPY"] = "JPY";
    CurrencyEnum["KES"] = "KES";
    CurrencyEnum["KHR"] = "KHR";
    CurrencyEnum["KMF"] = "KMF";
    CurrencyEnum["KRW"] = "KRW";
    CurrencyEnum["KWD"] = "KWD";
    CurrencyEnum["KZT"] = "KZT";
    CurrencyEnum["LBP"] = "LBP";
    CurrencyEnum["LKR"] = "LKR";
    CurrencyEnum["LTL"] = "LTL";
    CurrencyEnum["LVL"] = "LVL";
    CurrencyEnum["LYD"] = "LYD";
    CurrencyEnum["MAD"] = "MAD";
    CurrencyEnum["MDL"] = "MDL";
    CurrencyEnum["MGA"] = "MGA";
    CurrencyEnum["MKD"] = "MKD";
    CurrencyEnum["MMK"] = "MMK";
    CurrencyEnum["MOP"] = "MOP";
    CurrencyEnum["MUR"] = "MUR";
    CurrencyEnum["MXN"] = "MXN";
    CurrencyEnum["MYR"] = "MYR";
    CurrencyEnum["MZN"] = "MZN";
    CurrencyEnum["NAD"] = "NAD";
    CurrencyEnum["NGN"] = "NGN";
    CurrencyEnum["NIO"] = "NIO";
    CurrencyEnum["NOK"] = "NOK";
    CurrencyEnum["NPR"] = "NPR";
    CurrencyEnum["NZD"] = "NZD";
    CurrencyEnum["OMR"] = "OMR";
    CurrencyEnum["PAB"] = "PAB";
    CurrencyEnum["PEN"] = "PEN";
    CurrencyEnum["PHP"] = "PHP";
    CurrencyEnum["PKR"] = "PKR";
    CurrencyEnum["PLN"] = "PLN";
    CurrencyEnum["PYG"] = "PYG";
    CurrencyEnum["QAR"] = "QAR";
    CurrencyEnum["RON"] = "RON";
    CurrencyEnum["RSD"] = "RSD";
    CurrencyEnum["RUB"] = "RUB";
    CurrencyEnum["RWF"] = "RWF";
    CurrencyEnum["SAR"] = "SAR";
    CurrencyEnum["SDG"] = "SDG";
    CurrencyEnum["SEK"] = "SEK";
    CurrencyEnum["SGD"] = "SGD";
    CurrencyEnum["SOS"] = "SOS";
    CurrencyEnum["SYP"] = "SYP";
    CurrencyEnum["THB"] = "THB";
    CurrencyEnum["TND"] = "TND";
    CurrencyEnum["TOP"] = "TOP";
    CurrencyEnum["TRY"] = "TRY";
    CurrencyEnum["TTD"] = "TTD";
    CurrencyEnum["TWD"] = "TWD";
    CurrencyEnum["TZS"] = "TZS";
    CurrencyEnum["UAH"] = "UAH";
    CurrencyEnum["UGX"] = "UGX";
    CurrencyEnum["UYU"] = "UYU";
    CurrencyEnum["UZS"] = "UZS";
    CurrencyEnum["VEF"] = "VEF";
    CurrencyEnum["VND"] = "VND";
    CurrencyEnum["XAF"] = "XAF";
    CurrencyEnum["XOF"] = "XOF";
    CurrencyEnum["YER"] = "YER";
    CurrencyEnum["ZAR"] = "ZAR";
    CurrencyEnum["ZMK"] = "ZMK";
    CurrencyEnum["ZWL"] = "ZWL"; // Зимбабвийский доллар
})(CurrencyEnum || (exports.CurrencyEnum = CurrencyEnum = {}));
