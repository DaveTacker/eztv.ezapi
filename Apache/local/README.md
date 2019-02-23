## To generate a self-signed SSL certificate using the OpenSSL

1. Edit the [generate-ssl.sh](generate-ssl.sh) file's `buildExtCnf` function to include the relevant information about the domain and any existing subdomains.
2. Make sure it's executable: `chmod +x generate-ssl.sh`
3. Execute the script: `./generate-ssl.sh`
4. Update Apache's configuration to include the new private key and certificate
   * `SSLCertificateFile /var/www/therappy.online/Apache/local/domain.pem`
   * `SSLCertificateKeyFile /var/www/therappy.online/Apache/local/private.key`
5. Restart Apache: `sudo service apache2 restart`
6. Restart Chrome; go to: [chrome://restart](chrome://restart)

##### Optional
It also may be necessary to add the certificate directly to Chrome:
1. Settings
2. Manage Certificates
3. Trusted Root Certification Authorities
4. Import -> Select `*.pem` file

##### Optional 2
You may also need to allow invalid certs via a Chrome flag [chrome://flags/#allow-insecure-localhost](chrome://flags/#allow-insecure-localhost).