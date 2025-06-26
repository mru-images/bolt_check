function showSelectedValues() {
    const menu1 = document.getElementById('menu1').value;
    const menu2 = document.getElementById('menu2').value;
    const menu3 = document.getElementById('menu3').value;
    const menu4 = document.getElementById('menu4').value;
    document.getElementById('notfound').textContent = "";
    switch(menu2){
        case "1st Year":
            switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("24951A2101","24951A2164");
                            break;
                        case "ALL":
                            generateImages("24951A2101","24951A2164");
                            break;
                        default:
                        document.getElementById('notfound').textContent = "";
                        document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("24951A0101","24951A0124");
                                break;
                            case "ALL":
                                generateImages("24951A0101","24951A0124");
                                break;
                            default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                    case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("24951A6601","24951A6664");
                                break;
                            case "Section B":
                                generateImages("24951A6665","24951A66C8");
                                break;
                            case "Section C":
                                generateImages("24951A66C9","24951A66K2");
                                break;
                            case "Section D":
                                generateImages("24951A66K3","24951A66R7");
                                break;
                            case "ALL":
                                generateImages("24951A6601","24951A66R7");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                    switch(menu4){
                                case "Section A":
                                    generateImages("24951A6701","24951A6764");
                                    break;
                                case "ALL":
                                    generateImages("24951A6701","24951A6764");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    gene("24951A0501","24951A0564");
                                    break;
                                case "Section B":
                                    gene("24951A0565","24951A05C8");
                                    break;
                                case "Section C":
                                    gene("24951A05C9","24951A05K2");
                                    break;
                                case "Section D":
                                    gene("24951A05K3","24951A05R6");
                                    break;
                                case "Section E":
                                    gene("24951A05R7","24951A05Z0");
                                    break;
                                case "Section F":
                                    gene("24951A05Z1","24951A05Z9","24951A05AA","24951A05CJ");
                                    break;
                                case "Section G":
                                    benee("24951A05CK","24951A05FB");
                                    break;
                                case "ALL":
                                    gene("24951A0501","24951A05Z9","24951A05AA","24951A05FB");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("24951A0401","24951A0462");
                                    break;
                                case "Section B":
                                    generateImages("24951A0463","24951A04C5");
                                    break;
                                case "ALL":
                                    generateImages("24951A0401","24951A04C5");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("24951A0201","24951A0231");
                                        break;
                                    case "ALL":
                                        generateImages("24951A0201","24951A0231");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("24951A1201","24951A1264");
                                        break;
                                    case "Section B":
                                        generateImages("24951A1265","24951A12C9");
                                        break;
                                    case "ALL":
                                        generateImages("24951A1201","24951A12C9");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("24951A0301","24951A0328");
                                        break;
                                    case "ALL":
                                        generateImages("24951A0301","24951A0328");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;             
}
            break;
            default:
                document.getElementById('notfound').textContent = "";
                document.getElementById('notfound').textContent = "Images Cant be Found";
                break;
        case "2nd Year":
        switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("23951A2101","23951A2163","24955A2101","24955A2106");
                            break;
                        case "ALL":
                            generateImages("23951A2101","23951A2163","24955A2101","24955A2106");
                            break;
                        default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("23951A0101","23951A0115","24955A0101","24955A0120");
                                break;
                            case "ALL":
                                generateImages("23951A0101","23951A0115","24955A0101","24955A0120");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("23951A6601","23951A6664","24955A6601","24955A6607");
                                break;
                            case "Section B":
                                generateImages("23951A6665","23951A66C8","24955A6608","24955A6614");
                                break;
                            case "Section C":
                                generateImages("23951A66C9","23951A66K2","24955A6615","24955A6621");
                                break;
                            case "Section D":
                                generateImages("23951A66K3","23951A66R1","24955A6622","24955A6627");
                                break;
                            case "ALL":
                                generateImages("23951A6601","23951A66R1","24955A6601","24955A6627");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                switch(menu4){
                                case "Section A":
                                    generateImages("23951A6701","23951A6764","24955A6701","24955A6707");
                                    break;
                                case "Section B":
                                    generateImages("23951A6765","23951A67C8","24955A6708","24955A6714");
                                    break;
                                case "Section C":
                                    generateImages("23951A67C9","23951A67J8","24955A6715","24955A6720");
                                    break;
                                case "ALL":
                                    generateImages("23951A6701","23951A67J8","24955A6701","24955A6720");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("23951A0501","23951A051X","24955A0501","24955A0507");
                                    break;
                                case "Section B":
                                    generateImages("23951A051Y","23951A053V","24955A0508","24955A0514");
                                    break;
                                case "Section C":
                                    generateImages("23951A053W","23951A055T","24955A0515","24955A0521");
                                    break;
                                case "Section D":
                                    generateImages("23951A055U","23951A057R","24955A0522","24955A0528");
                                    break;
                                case "Section E":
                                    generateImages("23951A057S","23951A059P","24955A0529","24955A0535");
                                    break;
                                case "Section F":
                                    generateImages("23951A059Q","23951A05BM","24955A0536","24955A0541");
                                    break;
                                case "Section G":
                                    generateImages("23951A05BN","23951A05DA","24955A0542","24955A0547");
                                    break;
                                case "ALL":
                                    generateImages("23951A0501","23951A05DA","24955A0501","24955A0547");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("23951A0401","23951A0464","24955A0401","24955A0407");
                                    break;
                                case "Section B":
                                    generateImages("23951A0465","23951A04C8","24955A0408","24955A0414");
                                    break;
                                case "Section C":
                                    generateImages("23951A04C9","23951A04K2","24955A0415","24955A0421");
                                    break;
                                case "Section D":
                                    generateImages("23951A04K3","23951A04R0","24955A0422","24955A0427");
                                    break;
                                case "ALL":
                                    generateImages("23951A0401","23951A04R0","24955A0401","24955A0427");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A0201","23951A0229","24955A0201","24955A0205");
                                        break;
                                    case "ALL":
                                        generateImages("23951A0201","23951A0229","24955A0201","24955A0205");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A1201","23951A1264","24955A1201","24955A1207");
                                        break;
                                    case "Section B":
                                        generateImages("23951A1265","23951A12C8","24955A1208","24955A1214");
                                        break;
                                    case "Section C":
                                            generateImages("23951A12C9","23951A12J2","24955A1215","24955A1221");
                                            break;
                                    case "ALL":
                                        generateImages("23951A1201","23951A12J2","24955A1201","24955A1221");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A0301","23951A0328","24955A0301","24955A0308");
                                        break;
                                    case "ALL":
                                        generateImages("23951A0301","23951A0328","24955A0301","24955A0308");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                 case "CSE (CS)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("23951A6201","23951A6264","24955A6201","24955A6207");
                                        break;
                                    case "Section B":
                                        generateImages("23951A6265","23951A62C8","24955A6208","24955A6214");
                                        break;
                                    case "Section C":
                                        generateImages("23951A62C9","23951A62J2","24955A6215","24955A6220");
                                        break;
                                    case "ALL":
                                        generateImages("23951A6201","23951A62J2","24955A6201","24955A6220");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                        
                    break; 
                    default:
                        document.getElementById('notfound').textContent = "";
                        document.getElementById('notfound').textContent = "Images Cant be Found";          
}
            break;
            
        case "3rd Year":
        switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("22951A2101","22951A2156","22955A2101","22955A2115");
                            break;
                        case "ALL":
                            generateImages("22951A2101","22951A2156","22955A2101","22955A2115");;
                            break;
                        default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("22951A0101","22951A0120","22955A0101","22955A0124");
                                break;
                            case "ALL":
                                generateImages("22951A0101","22951A0120","22955A0101","22955A0124");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("22951A6601","22951A6664","22955A6601","22955A6606");
                                break;
                            case "Section B":
                                generateImages("22951A6665","22951A66C8","22955A6607","22955A6612");
                                break;
                            case "Section C":
                                generateImages("22951A66C9","22951A66J6","22955A6613","22955A6620");
                                break;
                            case "ALL":
                                generateImages("22951A6601","22951A66J6","22955A6601","22955A6620");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A6701","22951A6764","22955A6701","22955A6706");
                                    break;
                                case "Section B":
                                    generateImages("22951A6765","22951A67C7","22955A6707","22955A6712");
                                    break;
                                case "Section C":
                                    generateImages("22951A67C8","22951A67J3","22955A6713","22955A6720");
                                    break;
                                case "ALL":
                                    generateImages("22951A6701","22951A67J3","22955A6701","22955A6720");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A0501","22951A0565","22955A0501","22955A0506");
                                    break;
                                case "Section B":
                                    generateImages("22951A0566","22951A05D0","22955A0507","22955A0512");
                                    break;
                                case "Section C":
                                    generateImages("22951A05D1","22951A05K5","22955A0513","22955A0519");
                                    break;
                                case "Section D":
                                    generateImages("22951A05K6","22951A05R9","22955A0520","22955A0526");
                                    break;
                                case "ALL":
                                    generateImages("22951A0501","22951A05R9","22955A0501","22955A0526");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("22951A0401","22951A0464","22955A0401","22955A0405");
                                    break;
                                case "Section B":
                                    generateImages("22951A0465","22951A04C8","22955A0406","22955A0410");
                                    break;
                                case "Section C":
                                    generateImages("22951A04C9","22951A04K2","22955A0411","22955A0416");
                                    break;
                                case "Section D":
                                    generateImages("22951A04K3","22951A04Q0","22955A0416","22955A0426");
                                    break;
                                case "ALL":
                                    generateImages("22951A0401","22951A04Q0","22955A0401","22955A0426");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A0201","22951A0240","22955A0201","22955A0220");
                                        break;
                                    case "ALL":
                                        generateImages("22951A0201","22951A0240","22955A0201","22955A0220");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A1201","22951A1264","22955A1201","22955A1207");
                                        break;
                                    case "Section B":
                                        generateImages("22951A1265","22951A12B8","22955A1208","22955A1213");
                                        break;
                                    case "ALL":
                                        generateImages("22951A1201","22951A12B8","22955A1201","22955A1213");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A0301","22951A0319","22955A0301","22955A0323");
                                        break;
                                    case "ALL":
                                        generateImages("22951A0301","22951A0319","22955A0301","22955A0323");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                 case "CSE (CS)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A6201","22951A6264","22955A6201","22955A6207");
                                        break;
                                    case "Section B":
                                        generateImages("22951A6265","22951A62C2");
                                        break;
                                    case "ALL":
                                        generateImages("22951A6201","22951A62C2","22955A6201","22955A6207");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;    
                    case "CSE (IT)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("22951A3301","22951A3364","22955A3301","22955A3307");
                                        break;
                                    case "Section B":
                                        generateImages("22951A3365","22951A33C2");
                                        break;
                                    case "ALL":
                                        generateImages("22951A3301","22951A62C2","22955A3301","22955A3307");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break; 
                    default:
                        document.getElementById('notfound').textContent = "";
                        document.getElementById('notfound').textContent = "Images Cant be Found";
                        break;          
}
                    
            break;
        case "4th Year":
            switch(menu3){
                case "AERO":
                    switch(menu4){
                        case "Section A":
                            generateImages("21951A2101","21951A2165","22955A2101","22955A2105");
                            break;
                        case "Section B":
                                generateImages("21951A2166","21951A21C3","22955A2106","22955A2115");
                                break;
                        case "ALL":
                            generateImages("21951A2101","21951A21C3","22955A2101","22955A2115");
                            break;
                        default:
                            document.getElementById('notfound').textContent = "";
                            document.getElementById('notfound').textContent = "Images Cant be Found";
                            break;  
                    }
                    break;
                case "CE":
                    switch(menu4){
                            case "Section A":
                                generateImages("21951A0101","21951A0143","22955A0101","22955A0124");
                                break;
                            case "ALL":
                                generateImages("21951A0101","21951A0143","22955A0101","22955A0124");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (AIML)":
                    switch(menu4){
                            case "Section A":
                                generateImages("21951A6601","21951A6665","22955A6601","22955A6606");
                                break;
                            case "Section B":
                                generateImages("21951A6666","21951A66D0","22955A6607","22955A6612");
                                break;
                            case "Section C":
                                generateImages("21951A66D1","21951A66J8","22955A6613","22955A6620");
                                break;
                            case "ALL":
                                generateImages("21951A6601","21951A66J8","22955A6621","22955A6620");
                                break;
                            default:
                                document.getElementById('notfound').textContent = "";
                                document.getElementById('notfound').textContent = "Images Cant be Found";
                                break;  
                        }
                    break;
                case "CSE (DS)":
                switch(menu4){
                                case "Section A":
                                    generateImages("21951A6701","21951A6765","22955A6701","22955A6706");
                                    break;
                                case "Section B":
                                    generateImages("21951A6766","21951A67D0","22955A6707","22955A6712");
                                    break;
                                case "Section C":
                                    generateImages("21951A67D1","21951A67K0","22955A6713","22955A6720");
                                    break;
                                case "ALL":
                                    generateImages("21951A6701","21951A67K0","22955A6701","22955A6720");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "CSE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("21951A0501","21951A0565","22955A0501","22955A0506");
                                    break;
                                case "Section B":
                                    generateImages("21951A0566","21951A05D0","22955A0507","22955A0512");
                                    break;
                                case "Section C":
                                    generateImages("21951A05D1","21951A05K5","22955A0513","22955A0519");
                                    break;
                                case "Section D":
                                    generateImages("21951A05K6","21951A05R3","22955A0520","22955A0526");
                                    break;
                                case "ALL":
                                    generateImages("21951A0501","21951A05R3","22955A0501","22955A0526");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "ECE":
                    switch(menu4){
                                case "Section A":
                                    generateImages("21951A0401","21951A0465","22955A0401","22955A0405");
                                    break;
                                case "Section B":
                                    generateImages("21951A0466","21951A04D0","22955A0406","22955A0410");
                                    break;
                                case "Section C":
                                    generateImages("21951A04D1","21951A04K5","22955A04011","22955A0416");
                                    break;
                                case "Section D":
                                    generateImages("21951A04K6","21951A04R4","22955A0417","22955A0426");
                                    break;
                                case "ALL":
                                    generateImages("21951A0401","21951A04R4","22955A0401","22955A0426");
                                    break;
                                default:
                                    document.getElementById('notfound').textContent = "";
                                    document.getElementById('notfound').textContent = "Images Cant be Found";
                                    break;  
                            }
                    break;
                case "EEE":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A0201","21951A0245","22955A0201","22955A0220");
                                        break;
                                    case "ALL":
                                        generateImages("21951A0201","21951A0245","22955A0201","22955A0220");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "IT":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A1201","21951A1265","22955A1201","22955A1207");
                                        break;
                                    case "Section B":
                                        generateImages("21951A1266","21951A12C8","22955A1208","22955A1213");
                                        break;
                                    case "ALL":
                                        generateImages("21951A1201","21951A12C8");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;
                case "ME":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A0302","21951A0330","22955A0301","22955A0323");
                                        break;
                                    case "ALL":
                                        generateImages("21951A0302","21951A0330","22955A0301","22955A0323");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    break;  
                case "CSE (CS)":
                switch(menu4){
                                    case "Section A":
                                        generateImages("21951A6201","21951A6263","22955A6201","22955A6207");
                                        break;
                                    case "ALL":
                                        generateImages("21951A6201","21951A6263","22955A6201","22955A6207");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                        
                    break; 
                case "CSE (IT)":
                    switch(menu4){
                                    case "Section A":
                                        generateImages("21951A3301","21951A3363","22955A3301","22955A3307");
                                        break;
                                    case "ALL":
                                        generateImages("21951A3301","21951A3363","22955A3301","22955A3307");
                                        break;
                                    default:
                                        document.getElementById('notfound').textContent = "";
                                        document.getElementById('notfound').textContent = "Images Cant be Found";
                                        break;  
                                }
                    default:
            document.getElementById('notfound').textContent = "";
            document.getElementById('notfound').textContent = "Images Cant be Found";        
}
            break;
            
    }
}
populateSelectMenu('menu1', [
    'Photo'
]);
populateSelectMenu('menu2', [
    '1st Year',
    '2nd Year',
    '3rd Year',
    '4th Year'
]);
populateSelectMenu('menu3', [
    'AERO',
    'CE',
    'CSE (AIML)',
    'CSE (DS)',
    'CSE (CS)',
    'CSE',
    'ECE',
    'EEE',
    'IT',
    'CSE (IT)',
    'ME'

]);
populateSelectMenu('menu4', [
    'Section A',
    'Section B',
    'Section C',
    'Section D',
    'Section E',
    'Section F',
    'Section G',
    'ALL'
]);
async function generateImages(startRoll1, endRoll1, startRoll2, endRoll2) {
    document.getElementById("imageGallery").innerHTML = "";
    document.getElementById("imageCount").textContent = "Total Images: 0";
    document.getElementById("imageGallery").style.display = 'none';
    document.getElementById("loar").style.display = 'flex';
    async function processRolls(startRoll, endRoll) {
        if (!startRoll || !endRoll) {
            alert("Please enter both startRoll and endRoll.");
            return 0;
        }
        if (startRoll.length !== endRoll.length) {
            alert("Start roll and end roll must have the same length.");
            return 0;
        }

        let prefix = startRoll.slice(0, 8);
        let startAlphanumeric = startRoll.slice(8);
        let endAlphanumeric = endRoll.slice(8);

        let startNum = parseInt(startAlphanumeric, 36);
        let endNum = parseInt(endAlphanumeric, 36);

        if (isNaN(startNum) || isNaN(endNum) || startNum > endNum) {
            alert("Invalid alphanumeric part of the roll numbers.");
            return 0;
        }

        let imagePromises = [];
        let processedCount = 0;

        for (let i = startNum; i <= endNum; i++) {
            let rollSuffix = i.toString(36).toUpperCase().padStart(startAlphanumeric.length, '0');
            let rollNumber = prefix + rollSuffix;
            const benu = document.getElementById('menu1').value;
            let img = new Image();
            switch (benu) {
                case "SSC Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_SSC.jpg";
                    break;
                case "Inter Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_INTER.jpg";
                    break;
                case "Aadhar":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_Aadhar.jpg";
                    break;
                case "Caste Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_Caste.jpg";
                    break;
                case "Income Certificate":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/DOCS/" + rollNumber + "_Income.jpg";
                    break;
                case "Photo":
                    img.src = "https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/" + rollNumber + "/" + rollNumber + ".jpg";
                    break;
            }

            img.alt = rollNumber;

            let promise = new Promise((resolve) => {
                img.onload = function () {
                    resolve({ rollNumber, img });
                };

                img.onerror = function () {
                    resolve(null);
                };
            });

            imagePromises.push(promise);
        }
        let getIn = window.getInfo();
        for (let promise of imagePromises) {
            let result = await promise;
            if (result) {
                let { rollNumber, img } = result;
                let imageItem = document.createElement("div");
                imageItem.classList.add("imageItem");
                imageItem.appendChild(img);

                let rollNumberElement = document.createElement("p");
                rollNumberElement.classList.add("rollNumber");
                rollNumberElement.textContent = rollNumber;
                let infoButton = document.createElement("button");
                        infoButton.textContent = "Get Info";
                        infoButton.classList.add("infoButton");

                        img.onclick = function() {
                            deactivateAllContainers();
                            imageItem.classList.add("active");
                            infoButton.style.display = "block";
                        };

                        infoButton.onclick = function() {
                            appendAdditionalLinks(imageItem, rollNumber);
                            if (typeof clicked === "function") {
                               clicked(rollNumber.replace('.', '_'));
                            } else {
                                console.error("clicked function is not defined.");
                            }
                        };
                imageItem.appendChild(img);
                imageItem.appendChild(rollNumberElement);
                if(getIn){
                imageItem.appendChild(infoButton);
                }
                document.getElementById("imageGallery").appendChild(imageItem);

                processedCount++;
                document.getElementById("imageCount").textContent = `Total Images: ${parseInt(document.getElementById("imageCount").textContent.split(": ")[1]) + 1}`;
            }
        }
        return processedCount;
    }
    let totalImages = await processRolls(startRoll1, endRoll1);
    if(startRoll2 || endRoll2){
    totalImages += await processRolls(startRoll2, endRoll2);
    }
    console.log(`Total images processed: ${totalImages}`);
    document.getElementById("imageGallery").style.display = 'flex';
    document.getElementById("loar").style.display = 'none';
}

async function benee(startRoll, endRoll) {
    document.getElementById("imageGallery").innerHTML = "";
    document.getElementById("imageCount").textContent = "Total Images: 0";
    document.getElementById("imageGallery").style.display = 'none';
    document.getElementById("loar").style.display = 'flex';
    // Function to process a single roll range
    async function processRolls(startRoll, endRoll) {
        if (!startRoll || !endRoll) {
            alert("Please enter both startRoll and endRoll.");
            return 0;
        }
        if (startRoll.length !== endRoll.length) {
            alert("Start roll and end roll must have the same length.");
            return 0;
        }

        let prefix = startRoll.slice(0, 8);  // Prefix (e.g., "23951A05")
        let startLast = startRoll.slice(8);  // Last part (e.g., "AA")
        let endLast = endRoll.slice(8);  // Last part (e.g., "AZ")

        let imagePromises = [];
        let processedCount = 0;

        // Helper function to increment the last part (from AA to AZ, BA to BZ, etc.)
        function incrementLastPart(lastPart) {
            let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let firstChar = lastPart[0];
            let secondChar = lastPart[1];

            // Check if we need to increment the second character
            if (secondChar === 'Z') {
                if (firstChar === 'Z') {
                    return null;  // Stop when we reach ZZ
                }
                // Increment the first character and reset the second to 'A'
                firstChar = String.fromCharCode(firstChar.charCodeAt(0) + 1);
                secondChar = 'A';
            } else {
                // Increment the second character
                secondChar = String.fromCharCode(secondChar.charCodeAt(0) + 1);
            }

            return firstChar + secondChar;
        }

        let currentLast = startLast;

        // Loop through the roll number range
        while (currentLast <= endLast) {
            let rollNumber = `${prefix}${currentLast}`;
            const menuValue = document.getElementById('menu1').value;
            let img = new Image();

            // Set image source based on selected document type
            switch (menuValue) {
                case "SSC Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_SSC.jpg`;
                    break;
                case "Inter Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_INTER.jpg`;
                    break;
                case "Aadhar":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Aadhar.jpg`;
                    break;
                case "Caste Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Caste.jpg`;
                    break;
                case "Income Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Income.jpg`;
                    break;
                case "Photo":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/${rollNumber}.jpg`;
                    break;
            }

            img.alt = rollNumber;

            // Handle image loading and error events
            let promise = new Promise((resolve) => {
                img.onload = function () {
                    resolve({ rollNumber, img });
                };

                img.onerror = function () {
                    resolve(null);
                };
            });

            imagePromises.push(promise);

            // Increment the roll number's last part
            currentLast = incrementLastPart(currentLast);
            if (currentLast === null) break;  // Stop if we've reached the end

        }
        let getIn = window.getInfo();
        // Process all the images once they are loaded
        for (let promise of imagePromises) {
            let result = await promise;
            if (result) {
                let { rollNumber, img } = result;
                let imageItem = document.createElement("div");
                imageItem.classList.add("imageItem");
                imageItem.appendChild(img);

                let rollNumberElement = document.createElement("p");
                rollNumberElement.classList.add("rollNumber");
                rollNumberElement.textContent = rollNumber;

                let infoButton = document.createElement("button");
                infoButton.textContent = "Get Info";
                infoButton.classList.add("infoButton");

                img.onclick = function () {
                    deactivateAllContainers();
                    imageItem.classList.add("active");
                    infoButton.style.display = "block";
                };

                infoButton.onclick = function () {
                    appendAdditionalLinks(imageItem, rollNumber);
                    if (typeof clicked === "function") {
                        clicked(rollNumber.replace('.', '_'));
                    } else {
                        console.error("clicked function is not defined.");
                    }
                };

                imageItem.appendChild(img);
                imageItem.appendChild(rollNumberElement);
                if(getIn){
                imageItem.appendChild(infoButton);
                }
                document.getElementById("imageGallery").appendChild(imageItem);

                processedCount++;
                let currentCount = parseInt(document.getElementById("imageCount").textContent.split(": ")[1]) + 1;
                document.getElementById("imageCount").textContent = `Total Images: ${currentCount}`;
            }
        }
        return processedCount;
    }

    // Process the roll number range
    let totalImages = await processRolls(startRoll, endRoll);
    console.log(window.getInfo());
    console.log(`Total images processed: ${totalImages}`);
    document.getElementById("imageGallery").style.display = 'flex';
    document.getElementById("loar").style.display = 'none';
}



async function gene(startRoll1, endRoll1, startRoll2, endRoll2) {
    document.getElementById("imageGallery").innerHTML = "";
    document.getElementById("imageCount").textContent = "Total Images: 0";
    document.getElementById("imageGallery").style.display = 'none';
    document.getElementById("loar").style.display = 'flex';
    async function breses(startRoll, endRoll) {
        if (!startRoll || !endRoll) {
            alert("Please enter both startRoll and endRoll.");
            return 0;
        }
        if (startRoll.length !== endRoll.length) {
            alert("Start roll and end roll must have the same length.");
            return 0;
        }

        let prefix = startRoll.slice(0, 8);  // Prefix (e.g., "23951A05")
        let startLast = startRoll.slice(8);  // Last part (e.g., "AA")
        let endLast = endRoll.slice(8);  // Last part (e.g., "AZ")

        let imagePromises = [];
        let processedCount = 0;

        // Helper function to increment the last part (from AA to AZ, BA to BZ, etc.)
        function incrementLastPart(lastPart) {
            let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            let firstChar = lastPart[0];
            let secondChar = lastPart[1];

            // Check if we need to increment the second character
            if (secondChar === 'Z') {
                if (firstChar === 'Z') {
                    return null;  // Stop when we reach ZZ
                }
                // Increment the first character and reset the second to 'A'
                firstChar = String.fromCharCode(firstChar.charCodeAt(0) + 1);
                secondChar = 'A';
            } else {
                // Increment the second character
                secondChar = String.fromCharCode(secondChar.charCodeAt(0) + 1);
            }

            return firstChar + secondChar;
        }

        let currentLast = startLast;

        // Loop through the roll number range
        while (currentLast <= endLast) {
            let rollNumber = `${prefix}${currentLast}`;
            const menuValue = document.getElementById('menu1').value;
            let img = new Image();

            // Set image source based on selected document type
            switch (menuValue) {
                case "SSC Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_SSC.jpg`;
                    break;
                case "Inter Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_INTER.jpg`;
                    break;
                case "Aadhar":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Aadhar.jpg`;
                    break;
                case "Caste Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Caste.jpg`;
                    break;
                case "Income Certificate":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Income.jpg`;
                    break;
                case "Photo":
                    img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/${rollNumber}.jpg`;
                    break;
            }

            img.alt = rollNumber;

            // Handle image loading and error events
            let promise = new Promise((resolve) => {
                img.onload = function () {
                    resolve({ rollNumber, img });
                };

                img.onerror = function () {
                    resolve(null);
                };
            });

            imagePromises.push(promise);

            // Increment the roll number's last part
            currentLast = incrementLastPart(currentLast);
            if (currentLast === null) break;  // Stop if we've reached the end

        }
        let getIn = window.getInfo();
        // Process all the images once they are loaded
        for (let promise of imagePromises) {
            let result = await promise;
            if (result) {
                let { rollNumber, img } = result;
                let imageItem = document.createElement("div");
                imageItem.classList.add("imageItem");
                imageItem.appendChild(img);

                let rollNumberElement = document.createElement("p");
                rollNumberElement.classList.add("rollNumber");
                rollNumberElement.textContent = rollNumber;

                let infoButton = document.createElement("button");
                infoButton.textContent = "Get Info";
                infoButton.classList.add("infoButton");

                img.onclick = function () {
                    deactivateAllContainers();
                    imageItem.classList.add("active");
                    infoButton.style.display = "block";
                };

                infoButton.onclick = function () {
                    appendAdditionalLinks(imageItem, rollNumber);
                    if (typeof clicked === "function") {
                        clicked(rollNumber.replace('.', '_'));
                    } else {
                        console.error("clicked function is not defined.");
                    }
                };

                imageItem.appendChild(img);
                imageItem.appendChild(rollNumberElement);
                if(getIn){
                imageItem.appendChild(infoButton);
                }
                document.getElementById("imageGallery").appendChild(imageItem);

                processedCount++;
                let currentCount = parseInt(document.getElementById("imageCount").textContent.split(": ")[1]) + 1;
                document.getElementById("imageCount").textContent = `Total Images: ${currentCount}`;
            }
        }
        return processedCount;
    }

    async function processRolls(startRoll, endRoll) {
        if (!startRoll || !endRoll) {
            alert("Please enter both startRoll and endRoll.");
            return 0;
        }
        if (startRoll.length !== endRoll.length) {
            alert("Start roll and end roll must have the same length.");
            return 0;
        }

        let prefix = startRoll.slice(0, 8); // e.g., "23951A05"
        let startMiddle = startRoll.slice(8, 9); // e.g., "6"
        let startLast = startRoll.slice(9); // e.g., "0"
        let endMiddle = endRoll.slice(8, 9); // e.g., "9"
        let endLast = endRoll.slice(9); // e.g., "9"

        let imagePromises = [];
        let processedCount = 0;

        // Helper function to get the next alphanumeric character
        function getNextChar(char) {
            if (char >= '0' && char < '9') return String.fromCharCode(char.charCodeAt(0) + 1);
            else if (char === '9') return 'A';
            else if (char >= 'A' && char < 'Z') return String.fromCharCode(char.charCodeAt(0) + 1);
            return null; // No next character beyond 'Z'
        }

        let middleChar = startMiddle;
        while (middleChar <= endMiddle) {
            let lastChar = middleChar === startMiddle ? startLast : '0';

            // Loop over the last digit or letter
            while (lastChar <= '9') {
                let rollNumber = `${prefix}${middleChar}${lastChar}`;
                const menuValue = document.getElementById('menu1').value;
                let img = new Image();

                switch (menuValue) {
                    case "SSC Certificate":
                        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_SSC.jpg`;
                        break;
                    case "Inter Certificate":
                        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_INTER.jpg`;
                        break;
                    case "Aadhar":
                        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Aadhar.jpg`;
                        break;
                    case "Caste Certificate":
                        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Caste.jpg`;
                        break;
                    case "Income Certificate":
                        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_Income.jpg`;
                        break;
                    case "Photo":
                        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/${rollNumber}.jpg`;
                        break;
                }

                img.alt = rollNumber;

                let promise = new Promise((resolve) => {
                    img.onload = function () {
                        resolve({ rollNumber, img });
                    };

                    img.onerror = function () {
                        resolve(null);
                    };
                });

                imagePromises.push(promise);
                lastChar = getNextChar(lastChar);

                // Exit condition when reaching the end last number
                if (middleChar === endMiddle && lastChar > endLast) break;
            }

            middleChar = getNextChar(middleChar);
        }
        let getIn = window.getInfo();
        for (let promise of imagePromises) {
            let result = await promise;
            if (result) {
                let { rollNumber, img } = result;
                let imageItem = document.createElement("div");
                imageItem.classList.add("imageItem");
                imageItem.appendChild(img);

                let rollNumberElement = document.createElement("p");
                rollNumberElement.classList.add("rollNumber");
                rollNumberElement.textContent = rollNumber;

                let infoButton = document.createElement("button");
                infoButton.textContent = "Get Info";
                infoButton.classList.add("infoButton");

                img.onclick = function () {
                    deactivateAllContainers();
                    imageItem.classList.add("active");
                    infoButton.style.display = "block";
                };

                infoButton.onclick = function () {
                    appendAdditionalLinks(imageItem, rollNumber);
                    if (typeof clicked === "function") {
                        clicked(rollNumber.replace('.', '_'));
                    } else {
                        console.error("clicked function is not defined.");
                    }
                };

                imageItem.appendChild(img);
                imageItem.appendChild(rollNumberElement);
                if(getIn){
                imageItem.appendChild(infoButton);
                }
                document.getElementById("imageGallery").appendChild(imageItem);

                processedCount++;
                let currentCount = parseInt(document.getElementById("imageCount").textContent.split(": ")[1]) + 1;
                document.getElementById("imageCount").textContent = `Total Images: ${currentCount}`;
            }
        }
        return processedCount;
    }

    let totalImages = await processRolls(startRoll1, endRoll1);
    if (startRoll2 || endRoll2) {
        totalImages += await breses(startRoll2, endRoll2);
    }
    document.getElementById("imageGallery").style.display = 'flex';
    document.getElementById("loar").style.display = 'none';
    console.log(`Total images processed: ${totalImages}`);
}
function populateSelectMenu(id, options) {

    const select = document.getElementById(id);
    options.forEach(optionText => {
        const option = document.createElement('option');
        option.value = optionText;
        option.textContent = optionText;
        select.appendChild(option);
    });
}

function deactivateAllContainers() {
    document.querySelectorAll('.imageItem').forEach(container => {
        container.classList.remove('active');
        const button = container.querySelector('.infoButton');
        if (button) button.style.display = 'none';
        const additionalLinksContainer = container.querySelector('.additionalLinks');
        if (additionalLinksContainer) {
            additionalLinksContainer.style.display = 'none';
            additionalLinksContainer.innerHTML = ''; 
        }
    });
}

function appendAdditionalLinks(container, rollNumber) {
    let additionalLinksContainer = container.querySelector('.additionalLinks');
    if (additionalLinksContainer) {
        additionalLinksContainer.style.display = 'block';  
        additionalLinksContainer.innerHTML = '';  
    } else {
        additionalLinksContainer = document.createElement("div");
        additionalLinksContainer.classList.add("additionalLinks");
        container.appendChild(additionalLinksContainer);
    }

    let promises = [];

    for (let i = 1; i <= 6; i++) {
        let img = new Image();
        img.src = `https://iare-data.s3.ap-south-1.amazonaws.com/uploads/STUDENTS/${rollNumber}/DOCS/${rollNumber}_${getSuffix(i)}.jpg`;
        img.alt = `${rollNumber}_${getSuffix(i)}`;
        promises.push(new Promise((resolve) => {
            img.onload = function() {
                resolve(img);
            };
            img.onerror = function() {
                resolve(null);
            };
        }));
    }

    Promise.all(promises).then((results) => {
        results.forEach(img => {
            if (img) {
                additionalLinksContainer.appendChild(img);
            }
        });
    });
}

function getSuffix(index) {
    switch(index) {
        case 1: return "SSC";
        case 2: return "INTER";
        case 3: return "Aadhar";
        case 4: return "Caste";
        case 5: return "Income";
    }
}
window.populateSelectMenu = populateSelectMenu;