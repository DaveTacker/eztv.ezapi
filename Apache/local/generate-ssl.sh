#!/usr/bin/env bash

# Delete old files
rm *.key *.crt *.pem *.csr *.srl &> /dev/null

# A function that builds the temporary config file used to generate the SSL certificate and private key
buildExtCnf() {
cat << EOF > "v3-config.ext"
[req]
distinguished_name = req_distinguished_name
x509_extensions = v3_req
prompt = no

[req_distinguished_name]
C=US
ST=Washington
L=Spokane
O=Geekbocks LLC
OU=IT
emailAddress=dave@geekbocks.com
CN = eztv.geekbocks.local

[v3_req]
keyUsage = critical, digitalSignature, keyAgreement
extendedKeyUsage = serverAuth
subjectAltName = @alt_names

[alt_names]
DNS.1 = eztv.geekbocks.local
EOF
}

# Create v3-config.ext configuration file
buildExtCnf

openssl req -x509 -nodes -days 999 -newkey rsa:2048 -keyout private.key -out domain.pem -config v3-config.ext -sha256

# No longer need these...
rm v3-config.ext