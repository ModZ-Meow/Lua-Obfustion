function obfuscate(code) {

    let b = Buffer.from(code);

    let key = 0x55;
    let out = [];

    for (let i = 0; i < b.length; i++) {

        key ^= (i + 1);
        out.push(b[i] ^ key);
    }

    return `


local data = {${out.join(",")}}

local key = 0x55

print("loaded obf")
`;
}

module.exports = { obfuscate };
