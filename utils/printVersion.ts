// print version
export const logv = (version: string) => {
	return `
      ___           ___           ___           ___     
     /\\__\\         /\\  \\         /\\  \\         /\\  \\    
    /::|  |       /::\\  \\       /::\\  \\       /::\\  \\   
   /:|:|  |      /:/\\ \\  \\     /:/\\:\\  \\     /:/\\:\\  \\  
  /:/|:|__|__   _\\:\\~\\ \\  \\   /:/  \\:\\  \\   /::\\~\\:\\  \\ 
 /:/ |::::\\__\\ /\\ \\:\\ \\ \\__\\ /:/__/_\\:\\__\\ /:/\\:\\ \\:\\__\\
 \\/__/~~/:/  / \\:\\ \\:\\ \\/__/ \\:\\  /\\ \\/__/ \\/_|::\\/:/  /
       /:/  /   \\:\\ \\:\\__\\    \\:\\ \\:\\__\\      |:|::/  / 
      /:/  /     \\:\\/:/  /     \\:\\/:/  /      |:|\\/__/  
     /:/  /       \\::/  /       \\::/  /       |:|  |    
     \\/__/         \\/__/         \\/__/         \\|__|
     
Modify security group rule in Alibaba Cloud
VERSION: ${version}`
}
