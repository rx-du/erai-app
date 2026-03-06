import Foundation
import AuthenticationServices
import CryptoKit
import React

@objc(YahooAuthModule)
class YahooAuthModule: NSObject {

    var session: ASWebAuthenticationSession?

    @objc
    func authorize(
        _ clientId: String,
        redirectUri: String,
        resolver resolve: @escaping RCTPromiseResolveBlock,
        rejecter reject: @escaping RCTPromiseRejectBlock
    ) {

        // 🔐 PKCE generat nativ
        let codeVerifier = randomString(length: 64)
        let codeChallenge = sha256(codeVerifier)

        let state = randomString(length: 16)
        let nonce = randomString(length: 16)

        var components = URLComponents(string: "https://api.login.yahoo.com/oauth2/request_auth")!

        components.queryItems = [
            URLQueryItem(name: "client_id", value: clientId),
            URLQueryItem(name: "response_type", value: "code"),
            URLQueryItem(name: "redirect_uri", value: redirectUri),
            URLQueryItem(name: "scope", value: "openid email"),
            URLQueryItem(name: "state", value: state),
            URLQueryItem(name: "nonce", value: nonce),
            URLQueryItem(name: "code_challenge", value: codeChallenge),
            URLQueryItem(name: "code_challenge_method", value: "S256")
        ]

        guard let url = components.url else {
            reject("invalid_url", "Invalid URL", nil)
            return
        }

        session = ASWebAuthenticationSession(
            url: url,
            callbackURLScheme: "com.eraiapp"
        ) { callbackURL, error in

            if let error = error {
                reject("auth_error", error.localizedDescription, error)
                return
            }

            guard let callbackURL = callbackURL else {
                reject("no_callback", "No callback URL", nil)
                return
            }

            resolve([
                "callbackUrl": callbackURL.absoluteString,
                "codeVerifier": codeVerifier
            ])
        }

        session?.presentationContextProvider = self
        session?.prefersEphemeralWebBrowserSession = true
        session?.start()
    }

    private func randomString(length: Int) -> String {
        let letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-._~"
        return String((0..<length).map { _ in letters.randomElement()! })
    }

    private func sha256(_ input: String) -> String {
        let data = Data(input.utf8)
        let hash = SHA256.hash(data: data)
        return Data(hash).base64EncodedString()
            .replacingOccurrences(of: "+", with: "-")
            .replacingOccurrences(of: "/", with: "_")
            .replacingOccurrences(of: "=", with: "")
    }
}

extension YahooAuthModule: ASWebAuthenticationPresentationContextProviding {
    func presentationAnchor(for session: ASWebAuthenticationSession) -> ASPresentationAnchor {
        return UIApplication.shared.windows.first { $0.isKeyWindow }!
    }
}