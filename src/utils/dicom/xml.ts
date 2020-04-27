import { NativeDicomModel } from './nativeModel';
import * as assert from 'assert';
import { Node, NodeFactory } from './srom';

class DicomParser {
    static parse(xmlString: string): NativeDicomModel {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
        assert.equal(xmlDoc.childElementCount, 1);
        const root = xmlDoc.children[0];
        return NativeDicomModel.parse(root);
    }
}

export function test() {
    const dicomString = `<?xml version="1.0" encoding="UTF-8"?>
<NativeDicomModel xml:space="preserve">
  <DicomAttribute keyword="FileMetaInformationVersion" tag="00020001" vr="OB">
    <InlineBinary>AAE=</InlineBinary>
  </DicomAttribute>
  <DicomAttribute keyword="MediaStorageSOPClassUID" tag="00020002" vr="UI">
    <Value number="1">1.2.840.10008.5.1.4.1.1.88.22</Value>
  </DicomAttribute>
  <DicomAttribute keyword="MediaStorageSOPInstanceUID" tag="00020003" vr="UI">
    <Value number="1">2.25.224793923339609181243139195858254344686</Value>
  </DicomAttribute>
  <DicomAttribute keyword="TransferSyntaxUID" tag="00020010" vr="UI">
    <Value number="1">1.2.840.10008.1.2.1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ImplementationClassUID" tag="00020012" vr="UI">
    <Value number="1">1.3.6.1.4.1.5962.99.2</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ImplementationVersionName" tag="00020013" vr="SH">
    <Value number="1">PIXELMEDJAVA001</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceCreationDate" tag="00080012" vr="DA">
    <Value number="1">20020510</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceCreationTime" tag="00080013" vr="TM">
    <Value number="1">163455</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceCreatorUID" tag="00080014" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.0.3.5.1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SOPClassUID" tag="00080016" vr="UI">
    <Value number="1">1.2.840.10008.5.1.4.1.1.88.22</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SOPInstanceUID" tag="00080018" vr="UI">
    <Value number="1">2.25.224793923339609181243139195858254344686</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyDate" tag="00080020" vr="DA"/>
  <DicomAttribute keyword="ContentDate" tag="00080023" vr="DA">
    <Value number="1">20020510</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyTime" tag="00080030" vr="TM"/>
  <DicomAttribute keyword="ContentTime" tag="00080033" vr="TM">
    <Value number="1">163455</Value>
  </DicomAttribute>
  <DicomAttribute keyword="AccessionNumber" tag="00080050" vr="SH"/>
  <DicomAttribute keyword="Modality" tag="00080060" vr="CS">
    <Value number="1">SR</Value>
  </DicomAttribute>
  <DicomAttribute keyword="Manufacturer" tag="00080070" vr="LO"/>
  <DicomAttribute keyword="ReferringPhysicianName" tag="00080090" vr="PN">
    <PersonName number="1">
      <Alphabetic>
        <FamilyName>Fukuda</FamilyName>
        <GivenName>Katherine M.</GivenName>
        <NameSuffix>M. D.</NameSuffix>
      </Alphabetic>
    </PersonName>
  </DicomAttribute>
  <DicomAttribute keyword="StudyDescription" tag="00081030" vr="LO">
    <Value number="1">OFFIS Structured Reporting Samples</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SeriesDescription" tag="0008103E" vr="LO">
    <Value number="1">Comprehensive Report</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ReferencedPerformedProcedureStepSequence" tag="00081111" vr="SQ"/>
    <DicomAttribute keyword="PatientName" tag="00100010" vr="PN">
    <PersonName number="1">
      <Alphabetic>
        <FamilyName>YANG JEONG WON</FamilyName>
      </Alphabetic>
    </PersonName>
  </DicomAttribute>
  <DicomAttribute keyword="PatientID" tag="00100020" vr="LO">
    <Value number="1">01516725</Value>
  </DicomAttribute>
  <DicomAttribute keyword="PatientBirthDate" tag="00100030" vr="DA">
    <Value number="1">19220909</Value>
  </DicomAttribute>
  <DicomAttribute keyword="PatientSex" tag="00100040" vr="CS">
    <Value number="1">M</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyInstanceUID" tag="0020000D" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.1.2.2155604110.4180.1021041295.21</Value>
  </DicomAttribute>
  <DicomAttribute keyword="SeriesInstanceUID" tag="0020000E" vr="UI">
    <Value number="1">1.2.276.0.7230010.3.1.3.2155604110.4180.1021041295.22</Value>
  </DicomAttribute>
  <DicomAttribute keyword="StudyID" tag="00200010" vr="SH"/>
  <DicomAttribute keyword="SeriesNumber" tag="00200011" vr="IS">
    <Value number="1">1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="InstanceNumber" tag="00200013" vr="IS">
    <Value number="1">1</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
    <Value number="1">CONTAINER</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
    <Item number="1">
      <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
        <Value number="1">126000</Value>
      </DicomAttribute>
      <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
        <Value number="1">DCM</Value>
      </DicomAttribute>
      <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
        <Value number="1">Imaging Measurement Report</Value>
      </DicomAttribute>
      <DicomAttribute keyword="CodingSchemeUID" tag="0008010C" vr="UI">
        <Value number="1">1.2.840.10008.6.1.997</Value>
      </DicomAttribute>
    </Item>
  </DicomAttribute>
  <DicomAttribute keyword="ContinuityOfContent" tag="0040A050" vr="CS">
    <Value number="1">SEPARATE</Value>
  </DicomAttribute>
  <DicomAttribute keyword="PerformedProcedureCodeSequence" tag="0040A372" vr="SQ"/>
  <DicomAttribute keyword="CompletionFlag" tag="0040A491" vr="CS">
    <Value number="1">PARTIAL</Value>
  </DicomAttribute>
  <DicomAttribute keyword="VerificationFlag" tag="0040A493" vr="CS">
    <Value number="1">UNVERIFIED</Value>
  </DicomAttribute>
  <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
    <Item number="1">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">HAS CONCEPT MOD</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">CODE</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">121049</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">DCM</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Language of Content Item and Descendants</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptCodeSequence" tag="0040A168" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">eng</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">RFC5646</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">English</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
            <Value number="1">HAS CONCEPT MOD</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
            <Value number="1">CODE</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
            <Item number="1">
              <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                <Value number="1">121046</Value>
              </DicomAttribute>
              <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                <Value number="1">DCM</Value>
              </DicomAttribute>
              <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                <Value number="1">Country of Language</Value>
              </DicomAttribute>
            </Item>
          </DicomAttribute>
          <DicomAttribute keyword="ConceptCodeSequence" tag="0040A168" vr="SQ">
            <Item number="1">
              <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                <Value number="1">US</Value>
              </DicomAttribute>
              <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                <Value number="1">ISO3166_1</Value>
              </DicomAttribute>
              <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                <Value number="1">United States</Value>
              </DicomAttribute>
            </Item>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
    </Item>
    <Item number="2">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">HAS OBS CONTEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">PNAME</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">121008</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">DCM</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Person Observer Name</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="PersonName" tag="0040A123" vr="PN">
        <PersonName number="1">
          <Alphabetic>
            <FamilyName>Doe</FamilyName>
            <GivenName>Jane</GivenName>
          </Alphabetic>
        </PersonName>
      </DicomAttribute>
    </Item>
    <Item number="3">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">HAS OBS CONTEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">TEXT</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">128774</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">DCM</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Person Observer's Login Name</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
        <Value number="1">jdoe</Value>
      </DicomAttribute>
    </Item>
    <Item number="4">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">HAS CONCEPT MOD</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">CODE</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">121058</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">DCM</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Procedure reported</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptCodeSequence" tag="0040A168" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">44136-0</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">LN</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">PET unspecified body region</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
    </Item>
    <Item number="5">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">CONTAINS</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">CONTAINER</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">111028</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">DCM</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Image Library</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="ContinuityOfContent" tag="0040A050" vr="CS">
        <Value number="1">SEPARATE</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ObservationUID" tag="0040A171" vr="UI">
        <Value number="1">2.25.239108061065263370785162033783811931375</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="ReferencedSOPSequence" tag="00081199" vr="SQ">
            <Item number="1">
              <DicomAttribute keyword="ReferencedSOPClassUID" tag="00081150" vr="UI">
                <Value number="1">1.2.840.10008.5.1.4.1.1.2</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ReferencedSOPInstanceUID" tag="00081155" vr="UI">
                <Value number="1">1.3.12.2.1107.5.1.4.73100.30000020021821250460600014848</Value>
              </DicomAttribute>
            </Item>
          </DicomAttribute>
          <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
            <Value number="1">CONTAINS</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
            <Value number="1">IMAGE</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
            <Item number="1">
              <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                <Value number="1">HAS ACQ CONTEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                <Value number="1">CODE</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">121139</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">Modality</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptCodeSequence" tag="0040A168" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">PT</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">Positron emission tomography</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
            </Item>
            <Item number="2">
              <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                <Value number="1">HAS ACQ CONTEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                <Value number="1">TEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">121022</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">Accession Number</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
                <Value number="1">AN1234IMG</Value>
              </DicomAttribute>
            </Item>
            <Item number="3">
              <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                <Value number="1">HAS ACQ CONTEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                <Value number="1">DATE</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">111060</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">Study Date</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="Date" tag="0040a121" vr="DA">
                <Value number="1">20170113</Value>
              </DicomAttribute>
            </Item>
            <Item number="4">
              <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                <Value number="1">HAS ACQ CONTEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                <Value number="1">TIME</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">111061</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">Study Time</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="Time" tag="0040a122" vr="TM">
                <Value number="1">070844</Value>
              </DicomAttribute>
            </Item>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
    </Item>
    <Item number="6">
      <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
        <Value number="1">CONTAINS</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
        <Value number="1">CONTAINER</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
            <Value number="1">126010</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
            <Value number="1">DCM</Value>
          </DicomAttribute>
          <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
            <Value number="1">Imaging Measurements</Value>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
      <DicomAttribute keyword="ContinuityOfContent" tag="0040A050" vr="CS">
        <Value number="1">SEPARATE</Value>
      </DicomAttribute>
      <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
        <Item number="1">
          <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
            <Value number="1">CONTAINS</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ObservationDateTime" tag="0040a032" vr="DT">
            <Value number="1">20020510</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
            <Value number="1">CONTAINER</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
            <Item number="1">
              <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                <Value number="1">125007</Value>
              </DicomAttribute>
              <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                <Value number="1">DCM</Value>
              </DicomAttribute>
              <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                <Value number="1">Measurement Group</Value>
              </DicomAttribute>
            </Item>
          </DicomAttribute>
          <DicomAttribute keyword="ContinuityOfContent" tag="0040A050" vr="CS">
            <Value number="1">SEPARATE</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ObservationUID" tag="0040A171" vr="UI">
            <Value number="1">2.25.56002466128627498886935079903172938041</Value>
          </DicomAttribute>
          <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
            <Item number="1">
              <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                <Value number="1">HAS OBS CONTEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                <Value number="1">TEXT</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">112039</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">Tracking Identifier</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="TextValue" tag="0040A160" vr="UT">
                <Value number="1">Lesion1</Value>
              </DicomAttribute>
            </Item>
            <Item number="2">
              <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                <Value number="1">CONTAINS</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                <Value number="1">NUM</Value>
              </DicomAttribute>
              <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                    <Value number="1">126401</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                    <Value number="1">DCM</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                    <Value number="1">SUVbw</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="ObservationUID" tag="0040A171" vr="UI">
                <Value number="1">2.25.140657026119469861895824082767088344984</Value>
              </DicomAttribute>
              <DicomAttribute keyword="MeasuredValueSequence" tag="0040A300" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="MeasurementUnitsCodeSequence" tag="004008EA" vr="SQ">
                    <Item number="1">
                      <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                        <Value number="1">g/ml{SUVbw}</Value>
                      </DicomAttribute>
                      <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                        <Value number="1">UCUM</Value>
                      </DicomAttribute>
                      <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                        <Value number="1">g/ml{SUVbw}</Value>
                      </DicomAttribute>
                    </Item>
                  </DicomAttribute>
                  <DicomAttribute keyword="NumericValue" tag="0040A30A" vr="DS">
                    <Value number="1">1.8828952323684</Value>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
              <DicomAttribute keyword="ContentSequence" tag="0040A730" vr="SQ">
                <Item number="1">
                  <DicomAttribute keyword="RelationshipType" tag="0040A010" vr="CS">
                    <Value number="1">HAS CONCEPT MOD</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="ValueType" tag="0040A040" vr="CS">
                    <Value number="1">CODE</Value>
                  </DicomAttribute>
                  <DicomAttribute keyword="ConceptNameCodeSequence" tag="0040A043" vr="SQ">
                    <Item number="1">
                      <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                        <Value number="1">121401</Value>
                      </DicomAttribute>
                      <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                        <Value number="1">DCM</Value>
                      </DicomAttribute>
                      <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                        <Value number="1">Derivation</Value>
                      </DicomAttribute>
                    </Item>
                  </DicomAttribute>
                  <DicomAttribute keyword="ConceptCodeSequence" tag="0040A168" vr="SQ">
                    <Item number="1">
                      <DicomAttribute keyword="CodeValue" tag="00080100" vr="SH">
                        <Value number="1">386136009</Value>
                      </DicomAttribute>
                      <DicomAttribute keyword="CodingSchemeDesignator" tag="00080102" vr="SH">
                        <Value number="1">SCT</Value>
                      </DicomAttribute>
                      <DicomAttribute keyword="CodeMeaning" tag="00080104" vr="LO">
                        <Value number="1">Standard Deviation</Value>
                      </DicomAttribute>
                    </Item>
                  </DicomAttribute>
                </Item>
              </DicomAttribute>
            </Item>
          </DicomAttribute>
        </Item>
      </DicomAttribute>
    </Item>
  </DicomAttribute>
</NativeDicomModel>`;

    let model = DicomParser.parse(dicomString);
    const doc = document.implementation.createDocument(null, null, null);
    model.deserialize(doc);

    const nodeFactory = new NodeFactory();
    const srTree: Node = nodeFactory.createNode(model.dataset, null);
    console.log(srTree);

    return model;
}
