import { TCModel, TCString, GVL } from '@iabtcf/core'
import { TCFConfig } from '@/types'

/**
 * Create a TCModel from our config and consent choices.
 *
 * The TCModel is the IAB's in-memory representation of a user's
 * consent state — purposes, vendors, publisher restrictions, etc.
 */
export function createTCModel(
  config: TCFConfig,
  purposeConsent: Record<number, boolean>,
  vendorConsent: Record<number, boolean>
): TCModel {
  const model = new TCModel()

  // CMP identity
  model.cmpId = config.cmpId
  model.cmpVersion = config.cmpVersion
  model.publisherCountryCode = config.publisherCountryCode

  // Set consent for each purpose
  for (const [idStr, granted] of Object.entries(purposeConsent)) {
    const id = Number(idStr)
    if (granted) {
      model.purposeConsents.set(id)
    } else {
      model.purposeConsents.unset(id)
    }
  }

  // Set consent for each vendor
  for (const [idStr, granted] of Object.entries(vendorConsent)) {
    const id = Number(idStr)
    if (granted) {
      model.vendorConsents.set(id)
    } else {
      model.vendorConsents.unset(id)
    }
  }

  // Special features — always treated as opt-in consent
  for (const sfId of config.specialFeatureIds) {
    model.specialFeatureOptins.set(sfId)
  }

  // Publisher restrictions
  // Note: TCModel publisher restrictions use PurposeRestrictionVector
  // which may need GVL loaded for full validation. We set what we can here.
  // Full publisher-restriction encoding is handled when GVL is available.

  return model
}

/**
 * Encode a TCModel into a TC String (base64url-encoded bitfield).
 * This is the string stored in cookies and passed through the ad-tech chain.
 */
export function encodeTCString(model: TCModel): string {
  return TCString.encode(model)
}

/**
 * Decode a TC String back into a TCModel for inspection.
 */
export function decodeTCString(tcString: string): TCModel {
  return TCString.decode(tcString)
}

/**
 * Convenience: create a TCModel from config + consent and encode it
 * into a TC String in one step.
 */
export function buildTCString(
  config: TCFConfig,
  purposeConsent: Record<number, boolean>,
  vendorConsent: Record<number, boolean>
): string {
  const model = createTCModel(config, purposeConsent, vendorConsent)
  return encodeTCString(model)
}
