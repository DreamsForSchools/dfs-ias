def quick_sort(schools_data,instructors_data,programs_data):
    unassigned_instructors = {instructor:0 for instructor in instructors_data}
    unassigned_schools = {school:{'req':schools_data[school]['number_of_instructors'], 'cur':0} for school in schools_data}

    if (unassigned_instructors == 0){
        
    }