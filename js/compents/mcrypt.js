/**
 * 加密工具
 * 支持: 1. RSA
 */

var rsa_key; //RSA公钥
/**
 * RSA初始化
 */
function initRSA() {
    if (!rsa_key){
        setMaxDigits(262);
        rsa_key = new RSAKeyPair(
            // Public exponent extracted from private_key.pem using
            // openssl rsa -inform PEM -text -noout < private_key.pem
            // Or extracted from public key PEM file using
            // openssl rsa -pubin -inform PEM -text -noout < public_key.pem
            "10001",

            // Dummy decryption exponent -- actual value only kept on server.
            "10001",

            // Modulus extracted from private key PEM file using
            // openssl rsa -inform PEM -modulus -noout < private_key.pem
            // Or extracted from public key PEM file using
            // openssl rsa -pubin -inform PEM -modulus -noout < public_key.pem
            "C19FB154F7258C66E94E41686A54F5D34300C2C6A5F5FEF11B257424D82E2EF4980804A73BF38E701F757B448E5B94585CE8C1D9F3687D33D81AD670B07D9AA17D444571C6CF2B2B29B0628D3DBD359B118470E64B1C780755B2ECED2CE585764AB77C027AEDB2D968DF03D62F8FED633A270F0B3A551F81F98961B712E8EB3E55B2F209955D30AC151635A1A0A0D408F0A9F68568715A69146D028C710760FF3AB4474A94329B9E9DB9F52100065011D35319F595D92954CF302520D172249B1BF14F2DDC9D32646B427CA3918B5D9CE8349ED0C7A848D5E2F2D97878F573FB4C20CE5D4F4C0C124153BB9B63F76A5EEED63E4FB10F9FE8891144861A7C19E7",

            // Key size in bits.
            2048
        );
    }
}

/**
 * RSA加密
 * @param txt 明文
 * @return 密文(base64)
 */
function encryptWithRSA(txt) {
    if (!rsa_key){
        initRSA();
    }
    var ciphertext = encryptedString(rsa_key, txt, RSAAPP.PKCS1Padding, RSAAPP.RawEncoding);
    return window.btoa(ciphertext); //base-64
}