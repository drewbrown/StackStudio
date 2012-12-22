/******************************************************************************
 *
 * Copyright (c) 1999-2011 Cryptzone Group AB. All Rights Reserved.
 * 
 * This file contains Original Code and/or Modifications of Original Code as
 * defined in and that are subject to the MindTerm Public Source License,
 * Version 2.0, (the 'License'). You may not use this file except in compliance
 * with the License.
 * 
 * You should have received a copy of the MindTerm Public Source License
 * along with this software; see the file LICENSE.  If not, write to
 * Cryptzone Group AB, Drakegatan 7, SE-41250 Goteborg, SWEDEN
 *
 *****************************************************************************/

package com.mindbright.security.pkcs7;

import com.mindbright.asn1.ASN1Sequence;
import com.mindbright.asn1.ASN1OctetString;

import com.mindbright.security.x509.AlgorithmIdentifier;

public final class DigestInfo extends ASN1Sequence {

    public AlgorithmIdentifier digestAlgorithm;
    public ASN1OctetString     digest;

    public DigestInfo() {
        digestAlgorithm = new AlgorithmIdentifier();
        digest          = new ASN1OctetString();
        addComponent(digestAlgorithm);
        addComponent(digest);
    }

}

