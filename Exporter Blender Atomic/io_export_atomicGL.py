bl_info = {
    "name": "SI TP Fun",
    "author": "HELALI Billel",
    "blender": (2, 6, 3),
    "api": 35624,
    "location": "File > Import-Export",
    "description": "Export JS Meshes to AtomicGL",
    "warning": "",
    "wiki_url": "m",
    "tracker_url": "",
    "support": 'OFFICIAL',
    "category": "Import-Export"}
    
import math
import os
import bpy
import string
from bpy.props import *
import mathutils, math
import struct
import shutil
from bpy_extras.io_utils import ExportHelper
from os import remove
   
class Export_book(bpy.types.Operator, ExportHelper):   
	'''Exporte l'objet selectionne vers AtomicGl'''
	bl_idname = "export_mesh.js"
	bl_label = "Export as js for AtomicGl"

	filename_ext = ".js"
	filepath = ""

	def execute(self, context):
	       return save(self, context, **self.as_keywords(ignore=("check_existing", "filter_glob")))

def export_mesh(mesh, fichier):

	vertices="this.vertices=["
	indices="this.index=["	
	normals="this.normals=["
	uv="this.uv=["
	UVmap=mesh.tessface_uv_textures[0].data;	
	vertices_UVs=[]
	vertices_indices=[]
	for v in range(0, len(mesh.vertices)):
		vertices_UVs.append([])
		vertices_indices.append([])
	webgl_index=0
	
	for face in mesh.tessfaces:  #boucle sur les faces
	
		for v in range(3): # boucle sur les 3 points de la face
			vertex_index=face.vertices[v] #indice du vertex sous blender
			vertex=mesh.vertices[vertex_index]
			position=vertex.co
			normal=vertex.normal			
			vertex_UV=UVmap[face.index].uv[v]
			
			#verifie si le vertex a deja ete enregistre avec ces coordonnes UV
			alreadySaved=False
			index_UV=0
			for vUV in vertices_UVs[vertex_index]:
			  if (vUV[0]==vertex_UV[0] and vUV[1]==vertex_UV[1]):
			    alreadySaved=True
			    break
			  index_UV+=1  
			  
			if (alreadySaved):
				#index_UV=vertices_UVs[vertex_index].index(vertex_UV)
				indexe=vertices_indices[vertex_index][index_UV]
				
			else:
				#vertices_UVs[vertex_index].append(vertex_UV)
				#vertices_indices[vertex_index].append(webgl_index)
				indexe=webgl_index
				vertices+="%.4f,%.4f,%.4f,\n"%(position.x,position.y,position.z)				
				normals+="%.4f,%.4f,%.4f,\n"%(normal.x,normal.y,normal.z)
				#vertices+="%.4f,%.4f,\n"%(vertex_UV[0], vertex_UV[1])
				uv+="%.4f,%.4f,\n"%(vertex_UV[0], vertex_UV[1])
				webgl_index+=1			
			indices+="%i, \n"%(indexe)
	
	#enleve la derniere virgule
	vertices=vertices.rstrip(',')
	indices=indices.rstrip(',')
		
	vertices+="]\n"
	indices+="]\n"
	normals+="]\n"
	uv+="]\n"

	#ecriture dans le fichier header=mesh.name"=function(){\n"
	header="=function(){\n"
	footer="}"
	file_handler = open(fichier, 'w')
	file_handler.write(mesh.name)		
	file_handler.write(header)	
	file_handler.write(vertices)
	file_handler.write(normals)
	file_handler.write(uv)		
	file_handler.write(indices)
	file_handler.write(footer)
	file_handler.close()

def save(operator, context, filepath="",
	use_apply_modifiers=False,
	use_triangulate=True,
	use_compress=False):
	count_objets=0	

	if bpy.ops.object.mode_set.poll():
		bpy.ops.object.mode_set(mode='OBJECT')		

	scene=context.scene
	scale=scene.unit_settings.scale_length
	for objet in [objet for objet in scene.objects if objet.is_visible(scene)]:
		if (objet.type == 'MESH' and objet.select):
			selected_mesh=objet
			count_objets+=1
	
	if (count_objets==0):
		raise Exception("Erreur : Aucun mesh n'est selectionne")
		
	if (count_objets>1):
		raise Exception("Erreur : Ne selectionnez qu'un seul mesh")		
			
	mesh = selected_mesh.to_mesh(scene, True, "PREVIEW")
	data_string = export_mesh(mesh, filepath)

	return {'FINISHED'}

### REGISTER ###

def menu_func(self, context):
    self.layout.operator(Export_book.bl_idname, text="export en webgl TP SI  (.js)")

def register():
    bpy.utils.register_module(__name__)
    bpy.types.INFO_MT_file_export.append(menu_func)

def unregister():
    bpy.utils.unregister_module(__name__)
    bpy.types.INFO_MT_file_export.remove(menu_func)

    
if __name__ == "__main__":
    register()
