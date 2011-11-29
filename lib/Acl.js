var resources = [];
var roles   =[];


/**
 * ads a resource object whose permissions need to be controlled by the acl
 */

var addAclResource = function(refName,access){
    if('string' !== typeof refName || 'string' !== typeof access)
        throw{message:"resources are refrenced by name and must be strings",name:"IllegalRefrenceException"};
    
    var retRes          = getResource(refName);
    var retRole         = getRole(access);
    //already added
    if(retRes) return;
    
    retRole             = (retRole)?retRole:addRole(access);
    retRes              = {};
    retRes.name         = refName;
    retRes.aclaccess    = retRole;
    resources.push(retRes);
   
};

/**
*  adds a unique role to use for access control
*/
var addRole = function(name, inheritfrom){
    
    if(! 'string' == typeof name)
        throw{name:"IllegalArgException",message:" add role {name} param must be a string"};
    
    var inheritRole = getRole(inheritfrom);
    
    if('string' == typeof name ){
        var retRole = getRole(name);
        if(!retRole){
            var role            = {};
            role.name           = name;
            role.inheritfrom    = inheritRole;
            roles.push(role);
        }
        
    }
    
    return role;
    
};


var checkAcl = function(res,role,access,denied){
    
    var retRole = getRole(role);
    var retRes  = getResource(res);
    
    
    if(!retRole || ! retRes){
        
        if('function' == typeof denied)denied();
        else return false;
    }
    if(retRes.aclaccess.name == retRole.name){
        
        if('function' == typeof access)return access();
        else return true;
    }
    else if(retRole.inheritfrom){
       console.log("inherits "+ retRole.inheritfrom.name);
        return checkAcl(res,retRole.inheritfrom.name,access,denied);
    }
    else{
        
        return denied();
    }
      
};

exports.checkAcl = checkAcl;
exports.addRole = addRole;
exports.addAclResource = addAclResource;


function getRole(role){
    
    for(var i = 0; i < roles.length; i ++){
        if('string'== typeof role){
        if(roles[i].name == role)
            return roles[i];
        }else if('object' == typeof role){
            if(role.toString() == roles[i].toString())
                return roles[i];
        }
    }
    return null;
}

function getResource(res){
    console.log("looking for "+ res +" in "+ resources.toString());
    
    for(var i = 0; i < resources.length; i++){
        if('string'== typeof res){
            if(resources[i].name == res)
                return resources[i];
        }
    }
    return null;
}
