package learn.collaboreat.data;

import learn.collaboreat.models.RecipeHealthInfo;

import java.util.List;

public interface RecipeHealthInfoRepository {
    List<RecipeHealthInfo> findAll();

    boolean add(RecipeHealthInfo recipeHealthInfo);

    boolean deleteByKey(int recipeId, int healthInfoId);
}
