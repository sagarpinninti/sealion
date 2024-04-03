namespace myns;

entity threatinfo {
    key Threat_ID            : String;
        Threat_Component_ID  : String;
        Threat               : String;
        Threat_Narrative     : String;
        Attack_Precondition  : String;
        Component            : String;
        Phase                : String;
        Attack_Path          : String;
        Ease_of_Attack       : String;
        Impact               : String;
        Severity             : String;
        Followup             : String;
        Comment              : String;
        Control_ID           : String;
        Control_Narration    : String;
        NIST800_53r5_Mapping : String;
        MITRE_Tactic_ID      : String;
        MITRE_Technique_ID   : String;
}
