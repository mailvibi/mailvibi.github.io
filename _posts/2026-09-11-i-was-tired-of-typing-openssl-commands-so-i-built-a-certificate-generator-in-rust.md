---
layout: post
title: "I Was Tired of Typing OpenSSL Commands. So I Built a Certificate Generator in Rust"
description: "Generate self-signed TLS certificates directly in your browser using Rust and WebAssembly. No installation, no server, and private keys never leave your machine."
date: 2026-09-11 20:00:00 +0200
tags:
  - rust
  - webassembly
  - security
  - devtools
---

# I Was Tired of Typing OpenSSL Commands. So I Built a Certificate Generator in Rust

Generate self-signed TLS certificates directly in your browser — no installation, no server, and your private keys never leave your machine.

## 🔐 Try It First

### 👉 [SelfSignedCert](https://mailvibi.github.io/selfsignedcert/)

Need a certificate right now? Just use it.

Enter your hostname, add your Subject Alternative Names, choose the expiry, and generate your certificate.

**No installation. No signup. No OpenSSL commands to remember.**


*SelfSignedCert running entirely in the browser.*

If you just need a certificate, go ahead and use it. If you're curious about how it works, read on.

---

## Why I Built This

If you've ever needed HTTPS for local development or an internal service, you've probably used something like:

```bash
openssl req -x509 -newkey rsa:4096 ...
```

Then you have to look up the flags again.

How do I add Subject Alternative Names?

Why is my browser rejecting the certificate?

What configuration do I need?

OpenSSL is incredibly powerful, but creating a simple development certificate can be more complicated than necessary.

I also wasn't comfortable with sending private-key material to an online certificate-generation service.

So I built **SelfSignedCert**.

The goal is simple:

> **Make certificate generation easy while keeping the cryptographic operations in the browser.**

## 🔐 Your Private Key Stays in Your Browser

SelfSignedCert uses **Rust compiled to WebAssembly**. Certificate and key-generation operations happen locally in your browser.

```text
              Your Browser
                   │
                   ▼
          Rust + WebAssembly
                   │
          ┌────────┴────────┐
          ▼                 ▼
    Generate Key      Create Certificate
          │                 │
          └────────┬────────┘
                   ▼
              Download PEM
```

There is no certificate-generation backend that needs to receive your private key.

**The browser is the certificate-generation environment.**

## Subject Alternative Names Made Simple

Modern browsers use **Subject Alternative Names (SANs)** for hostname verification.

SelfSignedCert makes SANs easy to configure:

```text
localhost
127.0.0.1
::1
myapp.internal
```

The application distinguishes between DNS names and IP addresses when constructing the certificate.

No OpenSSL configuration file required.

## Create a Local Certificate Authority

The tool also supports creating a **self-signed Certificate Authority (CA)** and using it to sign certificates.

```text
             Root CA
                │
        ┌───────┼───────┐
        ▼       ▼       ▼
     Service  Service  Service
        A        B        C
```

This lets you experiment with:

- Root CA certificates
- CA-signed certificates
- Certificate chains
- Internal PKI

You can also specify certificate expiration either as a number of days or as a specific date, making it useful for testing certificate renewal and expiration handling.

## Why Rust + WebAssembly?

The core implementation is written in **Rust** and compiled to **WebAssembly**.

It uses cryptographic and certificate-related crates including:

- `p256`
- `ecdsa`
- `x509-cert`

Certificate generation uses **NIST P-256 (secp256r1)** with **ECDSA + SHA-256**.

The generated certificates are intended to work with common TLS software such as OpenSSL, Go's `crypto/tls`, Nginx, and Envoy.

WebAssembly allows the Rust implementation to run directly in the browser without requiring a native installation or a certificate-generation server.

## Open Source

SelfSignedCert is open source.

You can inspect the implementation, build it yourself, self-host it, or contribute improvements.

For security-related tooling, I think being able to see how the software works is important.

## The 30-Second Workflow

1. Open [SelfSignedCert](https://mailvibi.github.io/selfsignedcert/).
2. Enter your hostname, for example `localhost`.
3. Add your SANs, such as `127.0.0.1` and `::1`.
4. Choose the certificate expiration.
5. Click **Generate**.
6. Download the PEM files.

That's it.

**No OpenSSL command to remember.**

**No installation.**

**No private-key upload.**

## Give It a Try

If you've ever searched for an OpenSSL command just to generate a certificate for `localhost`, this might save you a few minutes.

### 🔐 [Generate a certificate with SelfSignedCert →](https://mailvibi.github.io/selfsignedcert/)

**Free to use. Runs in your browser. No private-key upload.**

## What's Next?

Some ideas for future improvements:

- More certificate configuration options
- Additional key algorithms
- Certificate inspection
- Certificate-chain visualization
- Additional PKI workflows

The project is open source, so feedback and contributions are welcome.

## Final Thoughts

I didn't build SelfSignedCert because OpenSSL is bad. OpenSSL is incredibly powerful.

I built it because **sometimes powerful isn't the same as convenient**.

When I'm setting up HTTPS for a local project, I want to spend my time working on the project — not remembering certificate-generation syntax.

Rust + WebAssembly made it possible to build a different kind of certificate-generation workflow:

> **A simple UI on top of local cryptographic operations.**

If you just need a certificate, give it a try:

### 👉 [SelfSignedCert](https://mailvibi.github.io/selfsignedcert/)

**Happy securing! 🔒**
