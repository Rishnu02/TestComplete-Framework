﻿function TestSelectorForm_OnShow(){
  
var FSO = aqFileSystem.GetFolderInfo(ProjectSuite.Path+"\Malta\\TestCaseDataFiles");

var listFiles = FSO.Files;

UserForms.TestSelectorUserForms.dataFileToRunCombo.Properties.Items.Add(listFiles.Name);

}

function TestSelectorUserForms_cxButton1_OnClick(Sender)
{
  UserForms.TestSelectorUserForms.ModalResult = mrOk;
}

function TestSelectorUserForms_cxCheckBox3_OnClick(Sender)
{
  UserForms.TestSelectorUserForms.cxCheckBox3.Checked;
}

function TestSelectorUserForms_dataFileToRunCombo_OnChange(Sender)
{
  
}

function TestSelectorUserForms_coverageSelectionListBox_OnExit(Sender)
{
  
}

function TestSelectorUserForms_coverageOverrideCheckbox_OnChange(Sender)
{
  
}

function TestSelectorUserForms_cxTextEdit2_OnExit(Sender)
{
  
}

function TestSelectorUserForms_cxCheckBox1_OnChange(Sender)
{
  
}